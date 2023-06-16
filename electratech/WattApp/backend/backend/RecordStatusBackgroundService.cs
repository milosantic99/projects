using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace backend
{
    public class RecordStatusBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _services;

        public RecordStatusBackgroundService(IServiceProvider services)
        {
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _services.CreateScope())
            {
                while (true)
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<WattAppDBContext>();


                    var allTurnOnOfs = await dbContext.autoTurnOnOffs.ToListAsync();
                    var date = DateTime.Today;
                    var hour = DateTime.Now.Hour;
                    foreach (var t in allTurnOnOfs)
                    {

                        if (t.dateOn != null && t.dateOff != null)
                        {

                            DateTime datumOn = (DateTime)t.dateOn;
                            DateTime datumOff = (DateTime)t.dateOff;

                            if (DateTime.Compare(datumOn.Date, date.Date) == 0 && hour == t.timeOn)
                            {
                                var linker = await dbContext.linkers.FirstOrDefaultAsync(x => x.id == t.linkerId);
                                linker.work = true;

                                var recStatus = await dbContext.recordStatus.FirstOrDefaultAsync(x => x.linkerId == linker.id);

                                if(recStatus == null)
                                {
                                    RecordStatus newRecordStatusWorkRules = new RecordStatus();
                                    newRecordStatusWorkRules.id = Guid.NewGuid();
                                    DateTime recordStatusDateOn = (DateTime)t.dateOn;
                                    newRecordStatusWorkRules.startDate = recordStatusDateOn.AddHours((int)t.timeOn);
                                    newRecordStatusWorkRules.linkerId = t.linkerId;

                                    dbContext.Add(newRecordStatusWorkRules);
                                }
                            }
                            if (DateTime.Compare(datumOff.Date, date.Date) == 0 && hour == t.timeOff)
                            {
                                var linker = await dbContext.linkers.FirstOrDefaultAsync(x => x.id == t.linkerId);
                                linker.work = false;

                                var recStatus = await dbContext.recordStatus.FirstOrDefaultAsync(x => x.linkerId == linker.id);

                                if (recStatus != null)
                                {
                                    DateTime recordStatusDateOff = (DateTime)t.dateOff;
                                    recStatus.endDate = recordStatusDateOff.AddHours((int)t.timeOff);
                                }

                                dbContext.autoTurnOnOffs.Remove(t);
                            }
                        }
                        else if (t.dateOn != null && t.dateOff == null)
                        {
                            DateTime datumOn = (DateTime)t.dateOn;
                            if (DateTime.Compare(datumOn.Date, date.Date) == 0 && hour == t.timeOn)
                            {
                                var linker = await dbContext.linkers.FirstOrDefaultAsync(x => x.id == t.linkerId);
                                linker.work = true;
                                dbContext.autoTurnOnOffs.Remove(t);

                                var recStatus = await dbContext.recordStatus.FirstOrDefaultAsync(x => x.linkerId == linker.id);

                                if (recStatus == null)
                                {
                                    RecordStatus newRecordStatusWorkRules = new RecordStatus();
                                    newRecordStatusWorkRules.id = new Guid();
                                    DateTime recordStatusDateOn = (DateTime)t.dateOn;
                                    newRecordStatusWorkRules.startDate = recordStatusDateOn.AddHours((int)t.timeOn);
                                    newRecordStatusWorkRules.linkerId = t.linkerId;

                                    dbContext.Add(newRecordStatusWorkRules);
                                }
                            }
                        }
                        else if (t.dateOn == null && t.dateOff != null)
                        {
                            DateTime datumOff = (DateTime)t.dateOff;
                            if (DateTime.Compare(datumOff.Date, date.Date) == 0 && hour == t.timeOff)
                            {
                                var linker = await dbContext.linkers.FirstOrDefaultAsync(x => x.id == t.linkerId);
                                linker.work = false;
                                dbContext.autoTurnOnOffs.Remove(t);

                                var recStatus = await dbContext.recordStatus.FirstOrDefaultAsync(x => x.linkerId == linker.id);

                                if(recStatus != null)
                                {
                                    DateTime recordStatusDateOff = (DateTime)t.dateOff;
                                    recStatus.endDate = recordStatusDateOff.AddHours((int)t.timeOff);
                                }

                            }
                        }
                        await dbContext.SaveChangesAsync();
                    }

                    var recordStatus = await (from rs in dbContext.recordStatus
                                              join l in dbContext.linkers on rs.linkerId equals l.id
                                              join d in dbContext.devices on l.deviceId equals d.id
                                              select new
                                              {
                                                  rs.id,
                                                  rs.linkerId,
                                                  d.consumption
                                              }).ToListAsync();


                    Record newRecord = new Record();
                    Random random = new Random();
                    foreach (var record in recordStatus)
                    {
                        var existingRecord = await dbContext.records.Where(x => x.linkerId == record.linkerId
                                                                                && x.timeStamp == DateTime.Now.Hour
                                                                                && x.date.Date == DateTime.Now.Date)
                                                                    .FirstOrDefaultAsync();

                        if(existingRecord != null)
                            existingRecord.currentConsumption = Math.Abs(Math.Round((record.consumption + random.NextDouble() * 50) / 24, 2));
                        else
                        {
                            newRecord.id = new Guid();
                            newRecord.linkerId = record.linkerId;
                            newRecord.timeStamp = DateTime.Now.Hour;
                            newRecord.date = DateTime.Now.Date;
                            newRecord.currentConsumption = Math.Abs(Math.Round((record.consumption + random.NextDouble() * 50) / DateTime.Today.Hour, 2));
                            newRecord.prediction = random.Next((int)Math.Floor(newRecord.currentConsumption * 0.4), (int)Math.Ceiling(newRecord.currentConsumption * 1.5));
                            newRecord.simulaiton = false;

                            await dbContext.AddAsync(newRecord);
                        }

                        var oldRecord = await dbContext.recordStatus.FirstOrDefaultAsync(x => x.id == record.id && x.endDate.HasValue);
                        if (oldRecord != null)
                        {
                            dbContext.recordStatus.Remove(oldRecord);
                        }
                        
                        await dbContext.SaveChangesAsync();
                    }

                    await Task.Delay(TimeSpan.FromHours(1), stoppingToken); // čekanje jednog sata - bolje 59 minuta
                    //await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
                }
            }
        }
    }
}
