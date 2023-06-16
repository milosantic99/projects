using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Remote.Linq.SimpleQuery;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilterController : Controller
    {
        private readonly WattAppDBContext dBContext;

        public FilterController(WattAppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        //[Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO")]
        //[HttpGet]
        //[Route("SortDsoProsumersConsumption/{idDso}")]
        //public async Task<IActionResult> SortDsoProsumersConsumption([FromRoute] string idDso)
        //{
        //    var prosumers = await dBContext.prosumers.Where(x => x.idDso.ToString() == idDso).ToListAsync();
        //    List<DtoProsumerSort> lista = new List<DtoProsumerSort>();

        //    foreach (var prosumer in prosumers)
        //    {
        //        var records = await dBContext.records.Where(x => x.prosumerId.ToString() == prosumer.id.ToString()).ToListAsync();
        //        double sumConsumption = records.Sum(x => x.currentConsumption);
        //        lista.Add(new DtoProsumerSort(prosumer.id, sumConsumption, prosumer.firstName, prosumer.lastName, prosumer.city, prosumer.address));
        //    }

        //    lista.Sort((x, y) => x.sumConsumption.CompareTo(y.sumConsumption));
        //    lista = lista.OrderByDescending(x => x.sumConsumption).ToList();

        //    return Ok(lista);
        //}

        //[Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO")]
        //[HttpGet]
        //[Route("SortProsumerDevicesConsumption/{idProsumer}")]
        //public async Task<IActionResult> SortProsumerDevicesConsumption([FromRoute] string idProsumer)
        //{
        //    var devices = await dBContext.devices.ToListAsync();
        //    List<DtoDeviceSort> lista = new List<DtoDeviceSort>();

        //    foreach (var device in devices)
        //    {
        //        var deviceCheck = await dBContext.records.Where(x => x.deviceId.ToString() == device.id.ToString() && x.prosumerId.ToString() == idProsumer).FirstOrDefaultAsync();
        //        if (deviceCheck != null)
        //        {
        //            var records = await dBContext.records.Where(x => x.deviceId.ToString() == device.id.ToString() && x.prosumerId.ToString() == idProsumer).ToListAsync();
        //            double sumConsumption = records.Sum(x => x.currentConsumption);
        //            lista.Add(new DtoDeviceSort(device.id, sumConsumption, device.type, device.manufacturer, device.model, device.consumption));
        //        }
        //    }

        //    lista.Sort((x, y) => x.sumConsumption.CompareTo(y.sumConsumption));
        //    lista = lista.OrderByDescending(x => x.sumConsumption).ToList();

        //    return Ok(lista);
        //}

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO")]
        [HttpPost]
        [Route("FilterProsumerDevicesStatus/{id}")]
        public async Task<IActionResult> FilterDevices([FromBody] FilterDevices filterUredjaja, [FromRoute] string id)
        {
            var filteredDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == id && x.access == filterUredjaja.access && x.control == filterUredjaja.control && x.work == filterUredjaja.work).ToListAsync();
            List<DeviceDtoProsumer> deviceDtoProsumers = new List<DeviceDtoProsumer>();

            foreach (var filter in filteredDevices)
            {
                var device = await dBContext.devices.FirstOrDefaultAsync(x => x.id.ToString() == filter.deviceId.ToString());
                if (device != null)
                {
                    deviceDtoProsumers.Add(new DeviceDtoProsumer(filter.id , device.id, device.type, device.manufacturer, device.model, 0, device.consumption, filter.access, filter.control, filter.work));
                }
            }

            if (deviceDtoProsumers.Count > 0)
            {
                return Ok(deviceDtoProsumers);
            }
            return BadRequest("Prosumer don't have devices");

        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO")]
        [HttpPost]
        [Route("FilterDsoProsumersAddress/{id}")]
        public async Task<IActionResult> FilterDsoProsumersAddress([FromBody] FilterProsumers filter, [FromRoute] string id)
        {
            var filteredProsumers = await dBContext.prosumers.Where(x => x.idDso.ToString() == id).ToListAsync();
            if (filteredProsumers == null)
            {
                return BadRequest("Dso don't have prosumers");
            }
            else
            {
                if (filter.address.IsNullOrEmpty() && filter.city.IsNullOrEmpty())
                {
                    return Ok(filteredProsumers);
                }

                if (!filter.city.IsNullOrEmpty() && filter.address.IsNullOrEmpty())
                {
                    filteredProsumers = await dBContext.prosumers.Where(x => x.city == filter.city).ToListAsync();
                    return Ok(filteredProsumers);
                }

                if (!filter.address.IsNullOrEmpty() && filter.city.IsNullOrEmpty())
                {
                    filteredProsumers = await dBContext.prosumers.Where(x => x.address == filter.address).ToListAsync();
                    return Ok(filteredProsumers);
                }

                if (!filter.address.IsNullOrEmpty() && !filter.city.IsNullOrEmpty())
                {
                    filteredProsumers = await dBContext.prosumers.Where(x => x.address == filter.address && x.city == filter.city).ToListAsync();
                    return Ok(filteredProsumers);
                }

                return BadRequest("Dso don't have prosumers");
            }


        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpPost]
        [Route("SearchDevices")]
        public async Task<IActionResult> SearchDevices([FromBody] SearchDevices search)
        {
            if (search.manufacturer.IsNullOrEmpty() && search.model.IsNullOrEmpty())
            {
                var devices = await dBContext.devices.ToListAsync();
                return Ok(devices);
            }
            else if (!search.manufacturer.IsNullOrEmpty() && search.model.IsNullOrEmpty())
            {
                var devices = await dBContext.devices.Where(x => x.manufacturer.Contains(search.manufacturer)).ToListAsync();
                return Ok(devices);
            }
            else if (search.manufacturer.IsNullOrEmpty() && !search.model.IsNullOrEmpty())
            {
                var devices = await dBContext.devices.Where(x => x.model.Contains(search.model)).ToListAsync();
                return Ok(devices);
            }
            else
            {
                var devices = await dBContext.devices.Where(x => x.model.Contains(search.model) && x.manufacturer.Contains(search.manufacturer)).ToListAsync();
                return Ok(devices);
            }
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("SearchByProsumerDeviceName")]
        public async Task<IActionResult> searchByProsumerDeviceName([FromQuery] string type, [FromQuery] string searchItem)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length);
                var jwtToken = jwtTokenHandler.ReadJwtToken(token);

                var nameIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid");
                if (nameIdClaim != null)
                {
                    var nameId = nameIdClaim.Value;

                    Guid id = Guid.Parse(nameId);

                    List<Linker> devices = new List<Linker>();

                    if (type.IsNullOrEmpty())
                        devices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper() && x.prosumerDeviceName.Contains(searchItem)).ToListAsync();
                    else
                    {
                        var allDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()).ToListAsync();

                        foreach (var device in allDevices)
                        {
                            var deviceTmp = await dBContext.devices.Where(x => x.id.ToString().ToUpper() == device.deviceId.ToString().ToUpper()).FirstOrDefaultAsync();
                            if (deviceTmp.type.Equals(type))
                                devices.Add(device);
                        }
                    }

                    return Ok(devices);
                }
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("FilterProsumerDevicesBySelectedType")]
        public async Task<IActionResult> filterProsumerDevicesBySelectedType([FromBody] string type)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length);
                var jwtToken = jwtTokenHandler.ReadJwtToken(token);

                var nameIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid");
                if (nameIdClaim != null)
                {
                    var nameId = nameIdClaim.Value;

                    Guid id = Guid.Parse(nameId);

                    List<Linker> devices = new List<Linker>();
                    var allDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()).ToListAsync();

                    foreach (var device in allDevices)
                    {
                        var deviceTmp = await dBContext.devices.Where(x => x.id.ToString().ToUpper() == device.deviceId.ToString().ToUpper()).FirstOrDefaultAsync();
                        if (deviceTmp.type.Equals(type))
                            devices.Add(device);
                    }

                    return Ok(devices);
                }
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("SearchProsumers/{paging}/{page}/{consumerProducer}")]
        public async Task<IActionResult> searchProsumers([FromRoute] int paging, [FromRoute] int page, [FromRoute] string consumerProducer,[FromQuery(Name = "search")] string? search, [FromQuery(Name = "type")] string? type)
        {
            DateTime date = DateTime.Now;
            DateTime firstDayOfTheMonth = new DateTime(date.Year, date.Month, 1);

            List<DsoProsumersWithIdDsoDto> results = new List<DsoProsumersWithIdDsoDto>();

            if (consumerProducer.Equals("consumer"))
            {
                if (type.IsNullOrEmpty() && search.IsNullOrEmpty())
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.consumption)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                                
                }
                else if (type.IsNullOrEmpty())
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.consumption)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
                else if (search.IsNullOrEmpty())
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.consumption)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
                else
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.consumption)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
            }
            else if (consumerProducer.Equals("producer"))
            {
                if (type.IsNullOrEmpty() && search.IsNullOrEmpty())
                {
                    results =  await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.product)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
                else if (type.IsNullOrEmpty())
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.product)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
                else if (search.IsNullOrEmpty())
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.product)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
                else
                {
                    results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .OrderByDescending(x => x.product)
                                    .Skip((page - 1) * paging)
                                    .Take(paging)
                                    .ToListAsync();
                }
            }

            return Ok(results);
        }


        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("NumberOfSearchProsumers/{paging}/{page}/{consumerProducer}")]
        public async Task<IActionResult> numOfSearchProsumers([FromRoute] int paging, [FromRoute] int page, [FromRoute] string consumerProducer, [FromQuery(Name = "search")] string? search, [FromQuery(Name = "type")] string? type)
        {
            DateTime date = DateTime.Now;
            DateTime firstDayOfTheMonth = new DateTime(date.Year, date.Month, 1);
            if (consumerProducer.Equals("consumer"))
            {
                if (type.IsNullOrEmpty() && search.IsNullOrEmpty())
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.consumption);
                    double minConsumption = results.Min(x => x.consumption);
                    var response = new {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
                else if (type.IsNullOrEmpty())
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.consumption);
                    double minConsumption = results.Min(x => x.consumption);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
                else if (search.IsNullOrEmpty())
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.consumption);
                    double minConsumption = results.Min(x => x.consumption);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
                else
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.consumption);
                    double minConsumption = results.Min(x => x.consumption);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
            }
            else if (consumerProducer.Equals("producer"))
            {
                if (type.IsNullOrEmpty() && search.IsNullOrEmpty())
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.product);
                    double minConsumption = results.Min(x => x.product);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
                else if (type.IsNullOrEmpty())
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                    .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                    .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.product);
                    double minConsumption = results.Min(x => x.product);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
                else if (search.IsNullOrEmpty())
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                     .Where(x => x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                     .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.product);
                    double minConsumption = results.Min(x => x.product);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
                else
                {
                    var results = await (
                                        from p in dBContext.prosumers
                                        join l in dBContext.linkers on p.id equals l.prosumerId into linkers
                                        from linker in linkers.DefaultIfEmpty()
                                        join r in dBContext.records on linker != null ? linker.id : 0 equals r.linkerId into records
                                        from record in records.DefaultIfEmpty()
                                        where record == null || (DateTime.Compare(record.date.Date, DateTime.Today.Date) <= 0 && DateTime.Compare(record.date.Date, firstDayOfTheMonth.Date) >= 0)
                                        group record by new
                                        {
                                            p.id,
                                            p.role,
                                            p.firstName,
                                            p.lastName,
                                            p.city,
                                            p.address,
                                            p.x,
                                            p.y
                                        } into g
                                        select new DsoProsumersWithIdDsoDto
                                        {
                                            prosumerId = g.Key.id,
                                            role = g.Key.role,
                                            prosumerName = g.Key.firstName + " " + g.Key.lastName,
                                            city = g.Key.city,
                                            adress = g.Key.address,
                                            consumption = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            product = Math.Round(-g.Where(x => x != null && x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2),
                                            debit = Math.Round(g.Where(x => x != null && x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000 * 7.5, 2),
                                            x = g.Key.x,
                                            y = g.Key.y
                                        }
                                    )
                                     .Where(x => x.prosumerName.ToLower().Contains(search.ToLower()) && x.city.Equals(type) && x.role == Enums.RoleName.ROLE_PROSUMER)
                                     .ToListAsync();

                    int totalNumberOfProsumer = results.Count;
                    double maxConsumption = results.Max(x => x.product);
                    double minConsumption = results.Min(x => x.product);
                    var response = new
                    {
                        maxNumOfProsumer = totalNumberOfProsumer,
                        max = maxConsumption,
                        min = minConsumption
                    };
                    return Ok(response);
                }
            }
            
            return BadRequest();
        }


        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("FilterDevicesByType")]
        public async Task<IActionResult> filterDevicesByType([FromBody] string type)
        {
            var devices = await dBContext.devices.Where(x => x.type.Equals(type)).ToListAsync();

            return Ok(devices);
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("FilterDevicesByTypeAndByProsumption/{type}/{prosumption}")]
        public async Task<IActionResult> filterDevicesByType([FromRoute] string type, [FromRoute] string prosumption)
        {
            if (prosumption == "producer")
            {
                var devices = await dBContext.devices.Where(x => x.type.Contains(prosumption))
                                                     .Select(x => new { deviceId = x.id, type = "", title = x.manufacturer, subtitle = x.model, icon = "faPlus" })
                                                     .ToListAsync();
                return Ok(devices);
            }
            else
            {
                var devices = await dBContext.devices.Where(x => x.type.Contains(type))
                                                     .Select(x => new { deviceId = x.id, type = "", title = x.manufacturer, subtitle = x.model, icon = "faPlus" })
                                                     .ToListAsync();
                return Ok(devices);
            }

        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("SearchForAddDevice/{consumerProducer}")]
        public async Task<IActionResult> SearchForAddDevice([FromRoute] string consumerProducer, [FromQuery(Name = "search")] string? search, [FromQuery(Name = "type")] string? type)
        {
            List<Device> devices = new List<Device>();

            if (consumerProducer.Equals("Producer") || consumerProducer.Equals("producer"))
            {
                devices = await dBContext.devices.Where(x => x.type.Equals("producer ")).ToListAsync();
            }
            else
            {
                devices = await dBContext.devices.Where(x => x.type.Equals("producer ") == false).ToListAsync();
            }

            List<AddDevicesDto> addDevices = new List<AddDevicesDto>();

            if (search.IsNullOrEmpty() && type.IsNullOrEmpty())
            {
                foreach (var device in devices)
                {
                    addDevices.Add(new AddDevicesDto(device.id, device.type, device.manufacturer, device.model));
                }
            }
            else if (type.IsNullOrEmpty())
            {
                var devicesSearch = devices.Where(x => x.model.Contains(search)).ToList();

                foreach (var device in devicesSearch)
                {
                    addDevices.Add(new AddDevicesDto(device.id, device.type, device.manufacturer, device.model));
                }
            }
            else if (search.IsNullOrEmpty())
            {
                var devicesType = devices.Where(x => x.type.Equals(type)).ToList();

                foreach (var device in devicesType)
                {
                    addDevices.Add(new AddDevicesDto(device.id, device.type, device.manufacturer, device.model));
                }
            }
            else
            {
                var devicesSearchType = devices.Where(x => x.type.Equals(type) && x.model.Contains(search)).ToList();

                foreach (var device in devicesSearchType)
                {
                    addDevices.Add(new AddDevicesDto(device.id, device.type, device.manufacturer, device.model));
                }
            }

            return Ok(addDevices);
        }
    }
}
