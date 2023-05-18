using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;
using Bertus_Igrannonica.HubConfig;
using Microsoft.AspNetCore.SignalR;
using Bertus_Igrannonica.TimerFeatures;
using Bertus_Igrannonica.DataStorage;
using Bertus_Igrannonica.Models;

namespace Bertus_Igrannonica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IHubContext<ChartHub> _hub; 

        
        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()));

            return Ok(new { Message = "Request Completed" });
        }



        [HttpPost("get_epoch")]
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        public async Task<IActionResult> getEpoch(EpochModel send_data)
        {

            //Console.WriteLine("USAO");

            //foreach (var e in send_data.data)
            //    Console.WriteLine(e);

            //Console.WriteLine("primio epohu");

            //await _hub.Clients.All.SendAsync("epochtransfer", send_data);
            await _hub.Clients.Client(send_data.connectionId).SendAsync("epochtransfer", send_data);

            //Console.WriteLine("posalo epohu");

            return Ok("PRIMIO EPOHU");
        }


    }
}
