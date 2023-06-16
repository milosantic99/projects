using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace backend.Controllers
{
    public class RecordsController : ControllerBase
    {
        private readonly WattAppDBContext dBContext;

        public RecordsController(WattAppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [HttpPost]
        [Route("AddRecord")]
        public async Task<IActionResult> GetAllDevices([FromBody] NewRecordDto recordDto)
        {
            Record record = new Record();

            record.id = Guid.NewGuid();
            record.timeStamp = recordDto.timeStamp;
            record.date = recordDto.date;
            record.linkerId = recordDto.linkerId;
            record.currentConsumption = recordDto.currentConsumption;
            record.prediction = recordDto.prediction;
            record.simulaiton = recordDto.simulaiton;

            await dBContext.records.AddAsync(record);
            await dBContext.SaveChangesAsync();

            return Ok("Record added");
        }
    }
}
