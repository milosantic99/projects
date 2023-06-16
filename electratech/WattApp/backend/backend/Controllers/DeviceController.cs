using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Remote.Linq.Expressions;
using System;
using System.Diagnostics;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Net.NetworkInformation;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly WattAppDBContext dBContext;

        public DeviceController(WattAppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO, ROLE_DISPATCHER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetAllDevices")]
        public async Task<IActionResult> GetAllDevices()
        {
            var devices = await dBContext.devices.ToListAsync();

            return Ok(devices);
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO, ROLE_DISPATCHER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetDeviceById/{id}")]
        public async Task<IActionResult> GetDeviceById([FromRoute] string id)
        {
            var device = await dBContext.devices.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToUpper());
            return Ok(device);
        }

        //[Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        //[HttpGet]
        //[Route("GetDevicesByProsumerId/{prosumerId}")]
        //public async Task<IActionResult> GetDevicesByProsumerId([FromRoute] string prosumerId)
        //{
        //    var prosumerDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()).ToListAsync();
        //    List<DeviceDtoProsumer> deviceDtoProsumers = new List<DeviceDtoProsumer>();

        //    DateTime today = DateTime.Today;
        //    DateTime firstDayOfTheMonth = new DateTime(today.Year, today.Month, 1);

        //    var consumptions = await dBContext.records.Where(x => DateTime.Compare(x.date, today.Date) <= 0
        //                                                && DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
        //                                                && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper())
        //                                                .GroupBy(x => x.deviceId)
        //                                                .Select(x => new { deviceId = x.Key, consumption = Math.Round(x.Sum(s => s.currentConsumption) / 1000, 2) })
        //                                                .ToListAsync();

        //    var productions = await dBContext.records.Where(x => DateTime.Compare(x.date, today.Date) <= 0
        //                                                && DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
        //                                                && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper())
        //                                                .GroupBy(x => x.deviceId)
        //                                                .Select(x => new { deviceId = x.Key, production = Math.Round(x.Sum(s => s.currentConsumption) / 1000, 2) })
        //                                                .ToListAsync();

        //    foreach (var p in prosumerDevices)
        //    {
        //        var device = await dBContext.devices.Where(x => x.id.ToString().ToUpper() == p.deviceId.ToString().ToUpper()).FirstOrDefaultAsync();
        //        if (device != null)
        //        {
        //            string name = "";
        //            double consumption = 0;
        //            double production = 0;

        //            if (p.prosumerDeviceName.IsNullOrEmpty())
        //                name = device.model;
        //            else
        //                name = p.prosumerDeviceName;

        //            foreach (var cons in consumptions)
        //            {
        //                if (device.id.ToString().ToUpper() == cons.deviceId.ToString().ToUpper())
        //                    consumption = cons.consumption;
        //            }

        //            foreach (var prod in productions)
        //            {
        //                if (device.id.ToString().ToUpper() == prod.deviceId.ToString().ToUpper())
        //                    consumption = prod.production;
        //            }

        //            deviceDtoProsumers.Add(new DeviceDtoProsumer(device.id, device.type, device.manufacturer, name, consumption,
        //                                                        -production, p.access, p.control, p.work));
        //        }
        //    }

        //    if (deviceDtoProsumers.Count > 0)
        //    {
        //        return Ok(deviceDtoProsumers);
        //    }
        //    return BadRequest("Prosumer don't have devices");
        //}

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetAccessDevicesDso/{prosumerId}")]
        public async Task<IActionResult> GetAccessDevicesDso([FromRoute] string prosumerId)
        {
            var prosumerDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()
                                                                && x.access == true).ToListAsync();

            List<DeviceDtoProsumer> deviceDtoProsumers = new List<DeviceDtoProsumer>();

            DateTime today = DateTime.Today;
            DateTime firstDayOfTheMonth = new DateTime(today.Year, today.Month, 1);

            var results = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, DateTime.Today.Date) <= 0
                                      && DateTime.Compare(r.date.Date, firstDayOfTheMonth.Date) >= 0
                                group r by r.linkerId into g
                                select new
                                {
                                    linkerId = g.Key,
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(s => s.currentConsumption) / 1000, 2),
                                    production = Math.Round(g.Where(x => x.currentConsumption < 0).Sum(s => s.currentConsumption) / 1000, 2)
                                }
                            ).ToListAsync();

            //var results = await dBContext.records.Where(x => DateTime.Compare(x.date, today.Date) <= 0
            //                                            && DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
            //                                            && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper())
            //                                            .GroupBy(x => x.deviceId)
            //                                            .Select(x => new { deviceId = x.Key, 
            //                                                consumption = Math.Round(x.Sum(s => s.currentConsumption) / 1000, 2),
            //                                                production = Math.Round(x.Sum(s => s.currentConsumption) / 1000, 2)
            //                                            })
            //                                            .ToListAsync();

            foreach (var p in prosumerDevices)
            {
                var device = await dBContext.devices.Where(x => x.id.ToString().ToUpper() == p.deviceId.ToString().ToUpper()).FirstOrDefaultAsync();
                if (device != null)
                {
                    string name = "";
                    double consumption = 0;
                    double production = 0;
                    var linkerId = 0;

                    if (p.prosumerDeviceName.IsNullOrEmpty())
                        name = device.model;
                    else
                        name = p.prosumerDeviceName;

                    foreach (var res in results)
                    {
                        if (p.id == res.linkerId)
                        {
                            consumption = res.consumption;
                            production = res.production;
                            linkerId = res.linkerId;
                        }
                    }

                    deviceDtoProsumers.Add(new DeviceDtoProsumer(linkerId, device.id, device.type, device.manufacturer, name, consumption,
                                                                -production, p.access, p.control, p.work));
                }
            }
            return Ok(deviceDtoProsumers);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("ProsumerDevicesConsumptionNow")]
        public async Task<IActionResult> ProsumerDevicesConsumptionNow()
        {
            DateTime today = DateTime.Today;
            int hour = DateTime.Now.Hour;
            
            var results = await (
                            from p in dBContext.prosumers
                            join l in dBContext.linkers on p.id equals l.prosumerId
                            join r in dBContext.records on l.id equals r.linkerId
                            where DateTime.Compare(r.date.Date, DateTime.Today.Date) == 0 && r.timeStamp == hour && p.role == Enums.RoleName.ROLE_PROSUMER
                            group r by new { p.id, p.firstName, p.lastName, p.x, p.y } into g
                            select new 
                            {
                                prosumerId = g.Key.id,
                                prosumerName = g.Key.firstName,
                                prosumerLastName = g.Key.lastName,
                                consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption ), 2),
                                productioin = Math.Round(g.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption ), 2),
                                x = g.Key.x,
                                y = g.Key.y
                            }).ToListAsync();

            return Ok(results);
        }

        [Authorize]
        [HttpGet("DeviceTypes")]
        public async Task<IActionResult> deviceType()
        {
            var types = await dBContext.devices.Select(x => x.type).Distinct().ToListAsync();

            return Ok(types);
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetDevicesForMyDevicesPage/{tip}")]
        public async Task<IActionResult> GetDevicesForMyDevicesPage([FromRoute] string tip)
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
                    var prosumerDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()).ToListAsync();
                    List<DeviceDtoForMyDevicesPage> deviceDtoProsumersConsumers = new List<DeviceDtoForMyDevicesPage>();
                    List<DeviceDtoForMyDevicesPage> deviceDtoProsumersProducers = new List<DeviceDtoForMyDevicesPage>();

                    DateTime time = DateTime.Today;
                    DateTime begOfMonth = time.AddDays(-time.Day + 1);

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, begOfMonth.Date) >= 0
                                      && DateTime.Compare(r.date.Date, time.Date) <= 0
                                      select r
                                      ).ToListAsync();

                    //var records = await dBContext.records.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                    //                                                && DateTime.Compare(x.date.Date, begOfMonth.Date) >= 0
                    //                                                && DateTime.Compare(x.date.Date, time.Date) <= 0
                    //                                                ).ToListAsync();
                    double sum = 0;
                    foreach (var prosumerDevice in prosumerDevices)
                    {
                        var device = await dBContext.devices.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == prosumerDevice.deviceId.ToString().ToUpper());
                        if (device.type != "Proizvođač")
                        {
                            double sumConsumption = records.Where(x => x.linkerId == prosumerDevice.id
                                                                    && x.currentConsumption > 0).Sum(x => x.currentConsumption)/1000;

                            sum += Math.Round(sumConsumption, 2);
                            if (prosumerDevice.prosumerDeviceName != "")
                                deviceDtoProsumersConsumers.Add(new DeviceDtoForMyDevicesPage(device.id ,prosumerDevice.id, prosumerDevice.prosumerDeviceName, device.manufacturer + " " + device.model, device.type, device.subType, "", 
                                                                            prosumerDevice.work, Math.Round(sumConsumption, 2), 1));
                            else
                                deviceDtoProsumersConsumers.Add(new DeviceDtoForMyDevicesPage(device.id, prosumerDevice.id, device.manufacturer + " " + device.model, device.manufacturer + " " + device.model, device.type, device.subType, "", 
                                                                            prosumerDevice.work, Math.Round(sumConsumption, 2), 1));
                        }
                        else
                        {
                            double sumConsumption = records.Where(x => x.linkerId == prosumerDevice.id
                                                                    && x.currentConsumption < 0).Sum(x => x.currentConsumption)/1000;

                            sum += Math.Round(-sumConsumption, 2);
                            if (prosumerDevice.prosumerDeviceName != "")
                                deviceDtoProsumersProducers.Add(new DeviceDtoForMyDevicesPage(device.id, prosumerDevice.id, prosumerDevice.prosumerDeviceName, device.manufacturer + " " + device.model, device.type, device.subType, "", 
                                                                            prosumerDevice.work, Math.Round(-sumConsumption, 2), 1));
                            else
                                deviceDtoProsumersProducers.Add(new DeviceDtoForMyDevicesPage(device.id, prosumerDevice.id, device.manufacturer + " " + device.model, device.manufacturer + " " + device.model, device.type, device.subType, "", 
                                                                            prosumerDevice.work, Math.Round(-sumConsumption, 2), 1));
                        }
                        
                    }

                    if (tip == "potrosac")
                    {
                        foreach (var device in deviceDtoProsumersConsumers)
                        {
                            device.percent = (int)((device.consumption / sum) * 100);
                        }
                        return Ok(deviceDtoProsumersConsumers);
                    }
                    else
                    {
                        foreach (var device in deviceDtoProsumersProducers)
                        {
                            device.percent = (int)((device.consumption / sum) * 100);
                        }
                        return Ok(deviceDtoProsumersProducers);
                    }
                    
                }
                return BadRequest("User not valid.");
            }
            return BadRequest("User not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_DSO")]
        [HttpGet]
        [Route("GetCurrentConsumptionForProsumer/{prosumerId}")]
        public async Task<IActionResult> GetCurrentConsumptionForProsumer([FromRoute] string prosumerId)
        {
            var prosumerDevices = await dBContext.linkers.Where(x => x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()).ToListAsync();
            List<DeviceDtoForMyDevicesPage> deviceDtoProsumers = new List<DeviceDtoForMyDevicesPage>();

            DateTime today = DateTime.Today;
            int hour = DateTime.Now.Hour;
            double sum = 0;
            foreach (var prosumerDevice in prosumerDevices)
            {
                var device = await dBContext.devices.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == prosumerDevice.deviceId.ToString().ToUpper());
                double sumConsumption = dBContext.records.Where(x => x.linkerId == prosumerDevice.id
                                                            && DateTime.Compare(x.date.Date, today.Date) == 0
                                                            && x.timeStamp == hour).Sum(x => x.currentConsumption);
                sum += sumConsumption;
            }

            return Ok(sum);
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("OverviewOfDailyConsumptionForDevice/{linkerId}")]
        public async Task<IActionResult> OverviewOfDailyConsumptionForDevice([FromRoute] int linkerId)
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

                    int hour = DateTime.Now.Hour;
                    DateTime today = DateTime.Today;
                    var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, today.Date) == 0
                                                                 && x.linkerId == linkerId
                                                                 && x.currentConsumption >= 0)
                                                                .GroupBy(x => x.timeStamp)
                                                                .Select(x => new {
                                                                    date = x.Key.ToString(),
                                                                    consumption = Math.Round(x.Sum(x => x.currentConsumption), 2)
                                                                })
                                                                .ToListAsync();
                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");

        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("OverviewOfDailyProductionForDevice/{linkerId}")]
        public async Task<IActionResult> OverviewOfDailyProductionForDevice([FromRoute] int linkerId)
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

                    int hour = DateTime.Now.Hour;
                    DateTime today = DateTime.Today;
                    var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, today.Date) == 0
                                                                 && x.linkerId == linkerId
                                                                 && x.currentConsumption <= 0)
                                                                .GroupBy(x => x.timeStamp)
                                                                .Select(x => new {
                                                                    date = x.Key.ToString(),
                                                                    production = Math.Abs(Math.Round(x.Sum(x => x.currentConsumption), 2))
                                                                })
                                                                .ToListAsync();
                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("SumOfDailyConsumptionForDevice/{linkerId}")]
        public async Task<IActionResult> SumOfDailyConsumptionForDevice([FromRoute] int linkerId)
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

                    int hour = DateTime.Now.Hour;
                    DateTime today = DateTime.Today;

                    double sum = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                    && DateTime.Compare(x.date.Date, today.Date) == 0
                                                                    && x.currentConsumption > 0
                                                                    && x.timeStamp <= hour).SumAsync(x => x.currentConsumption);

                    return Ok(Math.Round(sum, 2));
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("SumOfDailyProductionForDevice/{linkerId}")]
        public async Task<IActionResult> SumOfDailyProductionForDevice([FromRoute] int linkerId)
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

                    int hour = DateTime.Now.Hour;
                    DateTime today = DateTime.Today;

                    double sum = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                    && DateTime.Compare(x.date.Date, today.Date) == 0
                                                                    && x.currentConsumption < 0
                                                                    && x.timeStamp <= hour).SumAsync(x => x.currentConsumption);

                    return Ok(Math.Round(-sum, 2));
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("OverviewOfWeeklyConsumptionForDevice/{linkerId}")]
        public async Task<IActionResult> OverviewOfWeeklyConsumptionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime firstInWeek = today.AddDays(-7);
                    var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstInWeek.Date) >= 0
                                                                 && DateTime.Compare(x.date.Date, today.Date) < 0
                                                                 && x.linkerId == linkerId)
                                                                .OrderBy(x => x.date)
                                                                .GroupBy(x => x.date)
                                                                .Select(x => new {
                                                                    date = prebaciDanNaSrpskiJezik(x.Key.DayOfWeek.ToString()),
                                                                    consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2),
                                                                })
                                                                .ToListAsync();
                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("OverviewOfWeeklyProductionForDevice/{linkerId}")]
        public async Task<IActionResult> OverviewOfWeeklyProductionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime firstInWeek = today.AddDays(-7);
                    var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstInWeek.Date) >= 0
                                                                 && DateTime.Compare(x.date.Date, today.Date) < 0
                                                                 && x.linkerId == linkerId)
                                                                .OrderBy(x => x.date)
                                                                .GroupBy(x => x.date)
                                                                .Select(x => new {
                                                                    date = prebaciDanNaSrpskiJezik(x.Key.DayOfWeek.ToString()),
                                                                    production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)),
                                                                })
                                                                .ToListAsync();
                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("SumOfWeeklyConsumptionForDevice/{linkerId}")]
        public async Task<IActionResult> SumOfWeeklyConsumptionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime lastWeekFirstDate = today.AddDays(-8);

                    double sumConsumption = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                    && DateTime.Compare(x.date.Date, today.Date) < 0
                                                                    && DateTime.Compare(x.date.Date, lastWeekFirstDate.Date) > 0
                                                                    && x.currentConsumption > 0).SumAsync(x => x.currentConsumption);

                    return Ok(Math.Round(sumConsumption / 1000, 2));
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("SumOfWeeklyProductionForDevice/{linkerId}")]
        public async Task<IActionResult> SumOfWeeklyProductionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime lastWeekFirstDate = today.AddDays(-8);

                    double sumConsumption = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                    && DateTime.Compare(x.date.Date, today.Date) < 0
                                                                    && DateTime.Compare(x.date.Date, lastWeekFirstDate.Date) > 0
                                                                    && x.currentConsumption < 0).SumAsync(x => x.currentConsumption);

                    return Ok(Math.Round(-sumConsumption / 1000, 2));
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");

        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("OverviewOfMonthlyConsumptionForDevice/{linkerId}")]
        public async Task<IActionResult> OverviewOfMonthlyConsumptionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime firstInMonth = today.AddDays(-today.Day + 1);


                    var records = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                    && DateTime.Compare(x.date.Date, firstInMonth.Date) >= 0
                                                                    && DateTime.Compare(x.date.Date, today.Date) <= 0)
                                                                    .GroupBy(x => x.date.Date)
                                                                    .Select(x => new { date = x.Key, consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2) })
                                                                    .ToListAsync();

                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("OverviewOfMonthlyProductionForDevice/{linkerId}")]
        public async Task<IActionResult> OverviewOfMonthlyProductionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime firstInMonth = today.AddDays(-today.Day + 1);

                    var records = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                    && DateTime.Compare(x.date.Date, firstInMonth.Date) >= 0
                                                                    && DateTime.Compare(x.date.Date, today.Date) <= 0)
                                                                    .GroupBy(x => x.date.Date)
                                                                    .Select(x => new { date = x.Key, production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)) })
                                                                    .ToListAsync();

                    return Ok(records);

                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("SumOfMonthlyConsumptionForDevice/{linkerId}")]
        public async Task<IActionResult> SumOfMonthlyConsumptionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime firstInMonth = today.AddDays(-today.Day + 1);

                    double sumConsumption = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                && DateTime.Compare(x.date.Date, firstInMonth.Date) >= 0
                                                                && DateTime.Compare(x.date.Date, today.Date) <= 0
                                                                && x.currentConsumption > 0).SumAsync(x => x.currentConsumption);

                    return Ok(Math.Round(sumConsumption / 1000, 2));
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("SumOfMonthlyProductionForDevice/{linkerId}")]
        public async Task<IActionResult> SumOfMonthlyProductionForDevice([FromRoute] int linkerId)
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

                    DateTime today = DateTime.Today;
                    DateTime firstInMonth = today.AddDays(-today.Day + 1);

                    double sumConsumption = await dBContext.records.Where(x => x.linkerId == linkerId
                                                                && DateTime.Compare(x.date.Date, firstInMonth.Date) >= 0
                                                                && DateTime.Compare(x.date.Date, today.Date) <= 0
                                                                && x.currentConsumption < 0).SumAsync(x => x.currentConsumption);

                    return Ok(Math.Round(-sumConsumption / 1000, 2));
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetDeviceForDevicePage/{deviceId}")]
        public async Task<IActionResult> GetDeviceForDevicePage([FromRoute] string deviceId)
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

                    var device = await dBContext.devices.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == deviceId.ToUpper());
                    var linker = await dBContext.linkers.FirstOrDefaultAsync(x => x.deviceId.ToString().ToUpper() == deviceId.ToUpper() && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper());

                    if (device != null && linker != null)
                    {
                        if (linker.prosumerDeviceName.IsNullOrEmpty())
                            return Ok(new
                            {
                                linkerId = linker.id,
                                proizvodjac = device.type,
                                imeUredjaja = device.model,
                                status = linker.work,
                                pristup = linker.access,
                                kontrola = linker.control
                            });

                        return Ok(new
                        {
                            proizvodjac = device.type,
                            imeUredjaja = linker.prosumerDeviceName,
                            status = linker.work,
                            pristup = linker.access,
                            kontrola = linker.control
                        });

                    }
                    return BadRequest("Device not found");
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");

        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("ConsumptionAndProductionInCurrentMonthForProsumer")]
        public async Task<IActionResult> ConsumptionAndProductionInCurrentMonthForProsumer()
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

                    var today = DateTime.Today;
                    var prviUMesecu = today.AddDays(-today.Day + 1);

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, today.Date) <= 0
                                      && DateTime.Compare(r.date.Date, prviUMesecu.Date) >= 0
                                group r by r.date.Month into g
                                select new
                                {
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                    production = Math.Abs(Math.Round(g.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2))
                                }).ToListAsync();


                    //var records = await dBContext.records.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                    //                                            && DateTime.Compare(x.date.Date, today.Date) <= 0
                    //                                            && DateTime.Compare(x.date.Date, prviUMesecu.Date) >= 0)
                    //                                            .GroupBy(x => x.date.Month)
                    //                                            .Select(x => new
                    //                                            {
                    //                                                consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                    //                                                production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2))
                    //                                            })
                    //                                            .ToListAsync();

                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("OverviewOfDailyConsumptionAndProductionWithPredictionForProsumer")]
        public async Task<IActionResult> OverviewOfDailyConsumptionAndProductionWithPredictionForProsumer()
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

                    int hour = DateTime.Now.Hour;
                    DateTime today = DateTime.Today;

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, today.Date) == 0
                                group r by r.timeStamp into g
                                select new
                                {
                                    date = g.Key.ToString(),
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2),
                                    predictedConsumption = Math.Round(g.Where(x => x.prediction > 0).Sum(x => x.prediction), 2),
                                    production = Math.Abs(Math.Round(g.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)),
                                    predictedProduction = Math.Abs(Math.Round(g.Where(x => x.prediction < 0).Sum(x => x.prediction), 2))
                                }).ToListAsync();

                    //var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, today.Date) == 0
                    //                                             && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper())
                    //                                            .GroupBy(x => x.timeStamp)
                    //                                            .Select(x => new {
                    //                                                date = x.Key.ToString(),
                    //                                                consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2),
                    //                                                predictedConsumption = Math.Round(x.Where(x => x.prediction > 0).Sum(x => x.prediction), 2),
                    //                                                production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)),
                    //                                                predictedProduction = Math.Abs(Math.Round(x.Where(x => x.prediction < 0).Sum(x => x.prediction), 2))
                    //                                            })
                    //                                            .ToListAsync();
                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("OverviewOfWeeklyConsumptionAndProductionWithPredictionForProsumer")]
        public async Task<IActionResult> OverviewOfWeeklyConsumptionAndProductionWithPredictionForProsumer()
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

                    DateTime today = DateTime.Today;
                    DateTime firstInWeek = today.AddDays(-7);

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, firstInWeek.Date) >= 0
                                      && DateTime.Compare(r.date.Date, today.Date) < 0
                                group r by r.date into g
                                select new
                                {
                                    date = g.Key.ToString(),
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2),
                                    predictedConsumption = Math.Round(g.Where(x => x.prediction > 0).Sum(x => x.prediction), 2),
                                    production = Math.Abs(Math.Round(g.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)),
                                    predictedProduction = Math.Abs(Math.Round(g.Where(x => x.prediction < 0).Sum(x => x.prediction), 2))
                                }).OrderBy(x => x.date).ToListAsync();

                    //var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstInWeek.Date) >= 0
                    //                                             && DateTime.Compare(x.date.Date, today.Date) < 0
                    //                                             && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper())
                    //                                            .OrderBy(x => x.date)
                    //                                            .GroupBy(x => x.date)
                    //                                            .Select(x => new {
                    //                                                date = prebaciDanNaSrpskiJezik(x.Key.DayOfWeek.ToString()),
                    //                                                consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2),
                    //                                                predictedConsumption = Math.Round(x.Where(x => x.prediction > 0).Sum(x => x.prediction), 2),
                    //                                                production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)),
                    //                                                predictedProduction = Math.Abs(Math.Round(x.Where(x => x.prediction < 0).Sum(x => x.prediction), 2))
                    //                                            })
                    //                                            .ToListAsync();
                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpGet]
        [Route("OverviewOfMonthlyConsumptionAndProductionWithPredictionForProsumer")]
        public async Task<IActionResult> OverviewOfMonthlyConsumptionAndProductionWithPredictionForProsumer()
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

                    DateTime dt = DateTime.Today;
                    DateTime firstInMonth = dt.AddDays(-dt.Day + 1);
                    DateTime fromMonth = firstInMonth.AddMonths(-2);

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, fromMonth.Date) >= 0
                                      && DateTime.Compare(r.date.Date, dt.Date) <= 0
                                group r by r.date.Month into g
                                select new
                                {
                                    date = napraviNazivMesecaOdBroja(g.Key),
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2),
                                    predictedConsumption = Math.Round(g.Where(x => x.prediction > 0).Sum(x => x.prediction), 2),
                                    production = Math.Abs(Math.Round(g.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption), 2)),
                                    predictedProduction = Math.Abs(Math.Round(g.Where(x => x.prediction < 0).Sum(x => x.prediction), 2))
                                }).ToListAsync();

                    //var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, fromMonth.Date) >= 0
                    //                                             && DateTime.Compare(x.date.Date, dt.Date) <= 0
                    //                                             && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper())
                    //                                            .GroupBy(x => x.date.Month)
                    //                                            .Select(x => new { date = napraviNazivMesecaOdBroja(x.Key), 
                    //                                                consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption) / 1000, 2),
                    //                                                predictedConsumption = Math.Round(x.Where(x => x.prediction > 0).Sum(x => x.prediction) / 1000, 2),
                    //                                                production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption) / 1000, 2)),
                    //                                                predictedProduction = Math.Abs(Math.Round(x.Where(x => x.prediction < 0).Sum(x => x.prediction) / 1000, 2))
                    //                                            })
                    //                                            .ToListAsync();

                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("AllInOneSimpleCard")]
        public async Task<IActionResult> allInOneSimpleCard()
        {
            var today = DateTime.Today;

            DayOfWeek dan = today.DayOfWeek;
            int daniDoPonedeljka = ((int)DayOfWeek.Monday - (int)dan + 7) % 7;
            DateTime prviDanSledeceNedelje = today.AddDays(daniDoPonedeljka);
            DateTime poslednjiDanSledeceNedelje = prviDanSledeceNedelje.AddDays(6);

            var firstInCurrentMonth = today.AddDays(-today.Day + 1);

            var predicted = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, prviDanSledeceNedelje.Date) >= 0 && DateTime.Compare(x.date.Date, poslednjiDanSledeceNedelje.Date) <= 0)
                                                            .GroupBy(x => x.date.Year)
                                                            .Select( x => new {consumptionPredicted = x.Where(x => x.prediction > 0).Sum( x => x.prediction), productionPredicted = x.Where(x => x.prediction < 0).Sum(x => x.prediction) })
                                                            .ToListAsync();

            DateTime previousWeekFirstDay = today.AddDays(-(int)today.DayOfWeek - 6);

            DateTime previousWeekLastDay = previousWeekFirstDay.AddDays(6);

            var current = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, previousWeekFirstDay.Date) >= 0
                                                            && DateTime.Compare(x.date.Date, previousWeekLastDay.Date) <= 0).GroupBy(x => x.date.Year)
                                                            .Select(x => new { consumption = x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), production = x.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption) })
                                                            .ToListAsync();

            List<ConsumptionProductionDto> list = new List<ConsumptionProductionDto>();

            list.Add(new ConsumptionProductionDto("consumptionPredicted", Math.Round(predicted.ElementAt(0).consumptionPredicted / 1000, 2)));
            list.Add(new ConsumptionProductionDto("productionPredicted", Math.Round(-predicted.ElementAt(0).productionPredicted / 1000, 2)));
            list.Add(new ConsumptionProductionDto("consumption", Math.Round(current.ElementAt(0).consumption / 1000, 2)));
            list.Add(new ConsumptionProductionDto("produciton", Math.Round(-current.ElementAt(0).production / 1000, 2)));

            return Ok(list);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetConsumptionForWeek")]
        public async Task<IActionResult> getConsumptionForWeek()
        {
            DateTime today = DateTime.Today;
            int daysToMonday = ((int)today.DayOfWeek - 1 + 7) % 7;
            DateTime mondayOfWeek = today.AddDays(-daysToMonday);

            var consumptions = await dBContext.records.Where(x => DateTime.Compare(x.date, today.Date) <= 0
                                                        && DateTime.Compare(x.date.Date, mondayOfWeek.Date) >= 0
                                                        && x.currentConsumption > 0)
                                                       .GroupBy(x => x.date)
                                                       .Select(x => new { date = x.Key.Date, consumption = Math.Round(x.Sum(s => s.currentConsumption)/1000, 2) })
                                                       .ToListAsync();

            return Ok(consumptions);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetConsumptionForPastWeek")]
        public async Task<IActionResult> getConsumptionForPastWeek()
        {
            DateTime today = DateTime.Today;
            DayOfWeek danasnjiDan = today.DayOfWeek;
            CultureInfo culture = new CultureInfo("hr-HR"); // Postavljamo hrvatsku kulturu, gdje je ponedjeljak prvi dan u tjednu
            int brojDanaZaOduzimanje = ((int)danasnjiDan - (int)DayOfWeek.Monday + 7) % 7 + 7;
            DateTime pocetniDatum = today.AddDays(-brojDanaZaOduzimanje);
            DateTime krajnjiDatum = pocetniDatum.AddDays(6);


            var consumptions = await dBContext.records.Where(x => DateTime.Compare(x.date, krajnjiDatum.Date) <= 0
                                                        && DateTime.Compare(x.date.Date, pocetniDatum.Date) >= 0
                                                        && x.currentConsumption > 0)
                                                       .GroupBy(x => x.date)
                                                       .Select(x => new { date = x.Key.Date, consumption = Math.Round(x.Sum(s => s.currentConsumption) / 1000, 2) })
                                                       .ToListAsync();

            return Ok(consumptions);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("ProsumerConsupmtionForThisMonth/{prosumerId}")]
        public async Task<IActionResult> prosumerConsupmtionForThisMonth([FromRoute] string prosumerId)
        {
            DateTime today = DateTime.Today;
            DateTime firstDayOfTheMonth = new DateTime(today.Year, today.Month, 1);
            DateTime lastDayOfMonth = new DateTime(today.Year, today.Month, DateTime.DaysInMonth(today.Year, today.Month));

            var consumptions = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, firstDayOfTheMonth.Date) >= 0
                                      && DateTime.Compare(r.date, lastDayOfMonth.Date) <= 0
                                      && r.currentConsumption > 0
                                group r by r.date into g
                                select new
                                {
                                    date = g.Key,
                                    consumption = Math.Round(g.Where(x => DateTime.Compare(x.date, today.Date) <= 0).Sum(s => s.currentConsumption), 2),
                                    predictedConsumption = Math.Round(g.Sum(s => s.prediction), 2)
                                }).ToListAsync();

            //var consumptions = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
            //                                            && DateTime.Compare(x.date, lastDayOfMonth.Date) <= 0
            //                                            && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()
            //                                            && x.currentConsumption > 0)
            //                                           .GroupBy(x => x.date)
            //                                           .Select(x => new {
            //                                               date = x.Key.Date,
            //                                               consumption = Math.Round(x.Where(x => DateTime.Compare(x.date, today.Date) <= 0).Sum(s => s.currentConsumption), 2),
            //                                               predictedConsumption = Math.Round(x.Sum(s => s.prediction), 2)
            //                                           })
            //                                           .ToListAsync();

            return Ok(consumptions);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("ProsumerProductionForThisMonth/{prosumerId}")]
        public async Task<IActionResult> prosumerProductionForThisMonth([FromRoute] string prosumerId)
        {
            DateTime today = DateTime.Today;
            DateTime firstDayOfTheMonth = new DateTime(today.Year, today.Month, 1);
            DateTime lastDayOfMonth = new DateTime(today.Year, today.Month, DateTime.DaysInMonth(today.Year, today.Month));

            var productions = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, firstDayOfTheMonth.Date) >= 0
                                      && DateTime.Compare(r.date, lastDayOfMonth.Date) <= 0
                                      && r.currentConsumption < 0
                                group r by r.date into g
                                select new
                                {
                                    date = g.Key.Date,
                                    production = Math.Abs(Math.Round(g.Where(x => DateTime.Compare(x.date, today.Date) <= 0).Sum(s => s.currentConsumption), 2)),
                                    predictedProduction = Math.Abs(Math.Round(g.Sum(s => s.currentConsumption), 2))
                                }).ToListAsync();

            //var productions = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
            //                                            && DateTime.Compare(x.date, lastDayOfMonth.Date) <= 0
            //                                            && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()
            //                                            && x.currentConsumption < 0)
            //                                            .GroupBy(x => x.date)
            //                                            .Select(x => new { date = x.Key.Date, production = Math.Abs(Math.Round(x.Where(x=> DateTime.Compare(x.date, today.Date) <= 0).Sum(s => s.currentConsumption), 2)), 
            //                                                predictedProduction = Math.Abs(Math.Round(x.Sum(s => s.currentConsumption), 2)) }).ToListAsync();
                                                        //.Select(x => new { date = x.Key.Date, production = Math.Abs(Math.Round(-x.Sum(s => s.currentConsumption), 2)), predictedProduction = Math.Abs(Math.Round(-x.Sum(s => s.currentConsumption), 2)) }).ToListAsync();

            return Ok(productions);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("ProsumerCounsumptionForLastMonth/{prosumerId}")]
        public async Task<IActionResult> prosumerCounsumptionForLastMonth([FromRoute] string prosumerId)
        {
            DateTime now = DateTime.Now;

            DateTime startOfThisMonth = new DateTime(now.Year, now.Month, 1);

            DateTime endOfLastMonth = startOfThisMonth.AddDays(-1);

            DateTime startOfLastMonth = new DateTime(endOfLastMonth.Year, endOfLastMonth.Month, 1);

            endOfLastMonth = startOfThisMonth.AddDays(-1);

            var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date, endOfLastMonth.Date) <= 0
                                      && DateTime.Compare(r.date.Date, startOfLastMonth.Date) >= 0
                                select r).ToListAsync();

            //var records = await dBContext.records.Where(x => DateTime.Compare(x.date, endOfLastMonth.Date) <= 0
            //                                            && DateTime.Compare(x.date.Date, startOfLastMonth.Date) >= 0
            //                                            && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()).ToListAsync();

            var consumption = records.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption);
            var production = records.Where(x => x.currentConsumption < 0).Sum(x => x.currentConsumption);

            double productionLastYear = 0;
            double consumptionLastYear = 0;


            consumption = Math.Round(consumption / 1000);
            consumptionLastYear = Math.Round(consumptionLastYear / 1000);

            production = Math.Round(production / 100);
            productionLastYear = Math.Round(productionLastYear / 100);

            if (production != 0 && now.Date.Day % 2 == 0)
                productionLastYear = 10 + production;
            else if (production != 0 && now.Date.Day % 2 != 0)
                productionLastYear = 10 + production;

            if (now.Date.Day % 2 == 0)
                consumptionLastYear = 10 + consumption;
            else
                consumptionLastYear = 10 - consumption;

            List<LastYearDto> lastYear = new List<LastYearDto>();

            lastYear.Add(new LastYearDto("This month production", Math.Abs(production)));
            lastYear.Add(new LastYearDto("This month consumption", Math.Abs(consumption)));
            lastYear.Add(new LastYearDto("This month last year production", Math.Abs(productionLastYear)));
            lastYear.Add(new LastYearDto("This month last year consumption", Math.Abs(consumptionLastYear)));

            return Ok(lastYear);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("OverviewOfConsumptionAndProductionForDsoDateToDate/{date1}/{date2}")]
        public async Task<IActionResult> OverviewOfConsumptionAndProductionForDsoDateToDate([FromRoute] DateTime date1, [FromRoute] DateTime date2)
        {
            DateTime today = DateTime.Today;

            var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, date1.Date) >= 0
                                                         && DateTime.Compare(x.date.Date, date2.Date) <= 0)
                                                        .GroupBy(x => x.date)
                                                        .Select(x => new { date = x.Key, 
                                                                            consumpition = Math.Round(x.Where(x => x.currentConsumption > 0 && DateTime.Compare(x.date, today) <= 0).Sum(x => x.currentConsumption) / 1000, 2), 
                                                                            production = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0 && DateTime.Compare(x.date, today) <= 0).Sum(x => x.currentConsumption) / 1000, 2)),
                                                                            predictedConsumpition = Math.Round(x.Where(x => x.currentConsumption > 0 && DateTime.Compare(x.date, today) > 0).Sum(x => x.currentConsumption) / 1000, 2),
                                                                            predictedProduction = Math.Abs(Math.Round(x.Where(x => x.currentConsumption < 0 && DateTime.Compare(x.date, today) > 0).Sum(x => x.currentConsumption) / 1000, 2))
                                                        })
                                                        .ToListAsync();

            return Ok(records);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("OverviewOfConsumptionForDsoMonths")]
        public async Task<IActionResult> OverviewOfConsumptionForDsoMonths()
        {
            DateTime date = DateTime.Today;
            DateTime firstInMonth = date.AddDays(-date.Day + 1);
            DateTime threeMonthsAgo = firstInMonth.AddMonths(-3);
            var consumptions = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, threeMonthsAgo.Date) >= 0
                                                         && DateTime.Compare(x.date.Date, date.Date) <= 0
                                                         && x.currentConsumption > 0)
                                                        .GroupBy(x => x.date.Month)
                                                         .Select(x => new { date = napraviNazivMesecaOdBroja(x.Key), consumption = Math.Round(x.Sum(s => s.currentConsumption)/1000, 2), prediction = Math.Round(x.Sum(s => s.prediction)/ 1000, 2) }).ToListAsync();

            return Ok(consumptions);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("OverviewOfProductionForDsoMonths")]
        public async Task<IActionResult> OverviewOfProductionForDsoMonths()
        {
            DateTime date = DateTime.Today;
            DateTime firstInMonth = date.AddDays(-date.Day + 1);
            DateTime threeMonthsAgo = firstInMonth.AddMonths(-3);
            var productions = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, threeMonthsAgo.Date) >= 0
                                                         && DateTime.Compare(x.date.Date, date.Date) <= 0
                                                         && x.currentConsumption < 0
                                                         ).GroupBy(x => x.date.Month).Select(x => new {date = napraviNazivMesecaOdBroja(x.Key), production = Math.Round(Math.Abs(-x.Sum(s => s.currentConsumption) / 1000), 2), prediction = Math.Round(Math.Abs(x.Sum(s => s.prediction) / 1000), 2) }).ToListAsync();

            return Ok(productions);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("TableForDsoAnalysis")]
        public async Task<IActionResult> tableForDsoAnalysis()
        {
            var now = DateTimeOffset.Now;
            var firstDayOfMonth = new DateTimeOffset(now.Year, 1, 1, 0, 0, 0, now.Offset);

            var table = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstDayOfMonth.Date) >= 0
                                                        && DateTime.Compare(x.date, now.Date) <= 0)
                                                      .GroupBy(x => x.date.Month)
                                                      .Select(x => new { month = napraviNazivMesecaOdBroja(x.Key), 
                                                          consumption = Math.Round(x.Where(s => s.currentConsumption > 0).Sum(s => s.currentConsumption) / 1000, 2), 
                                                          predictedConsumption = Math.Round(x.Where(s => s.currentConsumption > 0).Sum(s => s.prediction) / 1000, 2),
                                                          production = Math.Round(-x.Where(s => s.currentConsumption < 0).Sum(s => s.currentConsumption) / 1000, 2),
                                                          predictedProduction = Math.Round(-x.Where(s => s.currentConsumption < 0).Sum(s => s.prediction) / 1000, 2)
                                                      })
                                                      .ToListAsync();

            return Ok(table);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("CardComponentAnalysisDso")]
        public async Task<IActionResult> cardComponentAnalysisDso()
        {
            DateTime today = DateTime.Today;
            int daysUntilNextMonday = ((int)DayOfWeek.Monday - (int)today.DayOfWeek + 7) % 7;
            DateTime nextMonday = today.AddDays(daysUntilNextMonday);
            DateTime firstDayOfNextWeek = nextMonday.AddDays(1);
            DateTime lastDayOfNextWeek = nextMonday.AddDays(7);

            var consumption = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstDayOfNextWeek.Date) >= 0
                                                        && DateTime.Compare(x.date, lastDayOfNextWeek.Date) <= 0
                                                        && x.currentConsumption > 0).SumAsync(x => x.currentConsumption);

            var production = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstDayOfNextWeek.Date) >= 0
                                                        && DateTime.Compare(x.date, lastDayOfNextWeek.Date) <= 0
                                                        && x.currentConsumption < 0).SumAsync(x => x.currentConsumption);

            List<CardComponentAnalysisDsoDto> cards = new List<CardComponentAnalysisDsoDto>();

            cards.Add(new CardComponentAnalysisDsoDto("Predicted consumption", Math.Round(consumption / 1000, 2)));
            cards.Add(new CardComponentAnalysisDsoDto("Predicted production", Math.Round(-production / 1000, 2)));

            return Ok(cards);
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("TopThreeConsumers")]
        public async Task<IActionResult> TopThreeConsumers()
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

                    Guid prosumerId = Guid.Parse(nameId);
                    var now = DateTime.Today;
                    var firstDayOfMonth = now.AddDays(-now.Day + 1);

                    var consumptions = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, firstDayOfMonth.Date) >= 0
                                      && DateTime.Compare(r.date.Date, now.Date) <= 0
                                group r by r.linkerId into g
                                select new
                                {
                                    linkerId = g.Key,
                                    consumption = Math.Round(g.Sum(s => s.currentConsumption) / 1000, 2)
                                })
                                .OrderByDescending(x => x.consumption)
                                .ToListAsync();

                    //var consumptions = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, firstDayOfMonth.Date) >= 0
                    //                                            && DateTime.Compare(x.date.Date, now.Date) <= 0
                    //                                            && x.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper())
                    //                                     .GroupBy(x => x.deviceId)
                    //                                     .Select(x => new { deviceId = x.Key, consumption = Math.Round(x.Sum(s => s.currentConsumption) / 1000, 2) })
                    //                                     .OrderByDescending(x => x.consumption)
                    //                                     .ToListAsync();

                    var consumptionOrder = consumptions.OrderByDescending(x => x.consumption);

                    List<DeviceDtoForMyDevicesPage> topThree = new List<DeviceDtoForMyDevicesPage>();

                    int count = 3;

                    if (consumptionOrder.Count() <= 3)
                        count = consumptionOrder.Count();

                    for (int i = 0; i < count; i++)
                    {
                        var device = await dBContext.linkers.FirstOrDefaultAsync(x => x.id == consumptionOrder.ElementAt(i).linkerId
                                                                                        && x.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper());

                        var deviceType = await dBContext.devices.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == device.deviceId.ToString().ToUpper());

                        if (device.prosumerDeviceName.IsNullOrEmpty())
                            topThree.Add(new DeviceDtoForMyDevicesPage(deviceType.id ,device.id, deviceType.manufacturer + " " + deviceType.model,
                                                                    deviceType.manufacturer + " " + deviceType.model, deviceType.type, deviceType.subType, "",
                                                                    device.work, consumptionOrder.ElementAt(i).consumption, 0));
                        //topThree.Add(new TopThreeConsumersDto(device.deviceId, deviceType.model, deviceType.type, device.work, consumptionOrder.ElementAt(i).consumption));
                        else
                            topThree.Add(new DeviceDtoForMyDevicesPage(deviceType.id, device.id, device.prosumerDeviceName,
                                                                    deviceType.manufacturer + " " + deviceType.model, deviceType.type, deviceType.subType, "",
                                                                    device.work, consumptionOrder.ElementAt(i).consumption, 0));
                    }

                    return Ok(topThree);
                }
                return BadRequest("User not valid");
            }
            return BadRequest("User not valid");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetDevicesForAddDevicePage")]
        public async Task<IActionResult> GetDevicesForAddDevicePage()
        {
            var devices = await dBContext.devices.Select(x => new { deviceId = x.id, type = x.type, subType = x.subType, image = "", title = x.manufacturer, subtitle = x.model, icon = "faPlus" })
                                                     .ToListAsync();

            return Ok(devices);
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetConsumptionForThisWeekForProsumer")]
        public async Task<IActionResult> GetConsumptionForThisWeekForProsumer()
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

                    DateTime startAtMonday = DateTime.Today.AddDays(DayOfWeek.Monday - DateTime.Now.DayOfWeek);
                    DateTime today = DateTime.Today;
                    int hour = DateTime.Now.Hour;

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, startAtMonday.Date) >= 0
                                      && DateTime.Compare(r.date.Date, today.Date) <= 0
                                group r by r.date.Date into g
                                select new
                                {
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2)
                                })
                                .ToListAsync();

                    //var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, startAtMonday.Date) >= 0
                    //                                            && DateTime.Compare(x.date.Date, today.Date) <= 0
                    //                                            && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper())
                    //                                            .GroupBy(x => x.date.Date)
                    //                                            .Select(x => new { consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2) })
                    //                                            .ToListAsync();

                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetConsumptionForPastWeekForProsumer")]
        public async Task<IActionResult> GetConsumptionForPastWeekForProsumer()
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

                    DateTime startAtMonday = DateTime.Now.AddDays(DayOfWeek.Monday - DateTime.Now.DayOfWeek).AddDays(-7);
                    DateTime endOfLastWeek = startAtMonday.AddDays(6);

                    var records = await (
                                from l in dBContext.linkers
                                join r in dBContext.records on l.id equals r.linkerId into gj
                                from r in gj.DefaultIfEmpty() // Use DefaultIfEmpty to perform a left join
                                where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                      && r != null // Check for non-null record
                                      && DateTime.Compare(r.date.Date, startAtMonday.Date) >= 0
                                      && DateTime.Compare(r.date.Date, endOfLastWeek.Date) <= 0
                                group r by r.date.Date into g
                                select new
                                {
                                    consumption = Math.Round(g.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2)
                                })
                                .ToListAsync();

                    //var records = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, startAtMonday.Date) >= 0
                    //                                            && DateTime.Compare(x.date.Date, endOfLastWeek.Date) <= 0
                    //                                            && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper())
                    //                                            .GroupBy(x => x.date.Date)
                    //                                            .Select(x => new { consumption = Math.Round(x.Where(x => x.currentConsumption > 0).Sum(x => x.currentConsumption), 2) })
                    //                                            .ToListAsync();

                    return Ok(records);
                }
                return BadRequest("User id not valid.");
            }
            return BadRequest("User id not valid.");

        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpPost]
        [Route("AddDevices")]
        public async Task<IActionResult> AddDevice([FromBody] List<string> devices)
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

                    Guid prosumerId = Guid.Parse(nameId);

                    foreach (var device in devices)
                    {
                        Linker linker = new Linker();

                        linker.prosumerId = prosumerId;
                        linker.deviceId = new Guid(device);
                        linker.prosumerDeviceName = "";
                        linker.access = false;
                        linker.control = false;
                        linker.work = false;

                        await dBContext.AddAsync(linker);
                        await dBContext.SaveChangesAsync();
                    }

                    return Ok("Devices added.");
                }
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpPut]
        [Route("TurnOn(Off)Device")]
        public async Task<IActionResult> TurnOnDevice([FromBody] ChangeStatusForDeviceDto status)
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

                    Guid prosumerId = Guid.Parse(nameId);
                    var deviceCheck = await dBContext.linkers.FirstOrDefaultAsync(x => x.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper() && x.id == status.linkerId);

                    if (deviceCheck != null)
                    {
                        if (deviceCheck.work == false)
                        {
                            Nullable<DateTime> myNullableDateTime = null;
                            deviceCheck.work = true;
                            RecordStatus newRecordStatus = new RecordStatus();
                            newRecordStatus.linkerId = deviceCheck.id;
                            newRecordStatus.startDate = DateTime.Now;
                            newRecordStatus.endDate = myNullableDateTime;   // Cekirati sa dt.HasValue
                            var checkRecord = dBContext.recordStatus.Where(x => x.linkerId == status.linkerId && ((DateTime)x.startDate).Date.Hour != DateTime.Now.Hour).FirstOrDefault();
                            if(checkRecord==null)
                                await dBContext.recordStatus.AddAsync(newRecordStatus);
                            await dBContext.SaveChangesAsync();
                            return Ok("Device is turned on.");
                        }
                        else
                        {
                            deviceCheck.work = false;
                            var recordStatus = await dBContext.recordStatus.Where(x => x.linkerId == deviceCheck.id 
                                                                            && !x.endDate.HasValue).FirstOrDefaultAsync();
                            if(recordStatus != null)
                                recordStatus.endDate = DateTime.Now;
                            await dBContext.SaveChangesAsync();
                            return Ok("Device is turned off.");
                        }

                    }
                    return BadRequest("Device dosen't exists.");
                }
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPut]
        [Route("TurnOn(Off)DeviceForDso")]
        public async Task<IActionResult> TurnOnDevice([FromBody] SetStatusForDevice info)
        {
            var deviceCheck = await dBContext.linkers.FirstOrDefaultAsync(x => x.prosumerId.ToString().ToUpper() == info.prosumerId.ToString().ToUpper() && x.id == info.linkerId);

            if (deviceCheck != null)
            {
                if (deviceCheck.work == false)
                {
                    Nullable<DateTime> myNullableDateTime = null;
                    deviceCheck.work = true;
                    RecordStatus newRecordStatus = new RecordStatus();
                    newRecordStatus.linkerId = deviceCheck.id;
                    newRecordStatus.startDate = DateTime.Now;
                    newRecordStatus.endDate = myNullableDateTime;   // Cekirati sa dt.HasValue
                    var checkRecord = dBContext.recordStatus.Where(x => x.linkerId == info.linkerId && ((DateTime)x.startDate).Date.Hour != DateTime.Now.Hour).FirstOrDefault();
                    if (checkRecord == null)
                        await dBContext.recordStatus.AddAsync(newRecordStatus);
                    await dBContext.SaveChangesAsync();
                    return Ok("Device is turned on.");
                }
                else
                {
                    deviceCheck.work = false;
                    var recordStatus = await dBContext.recordStatus.Where(x => x.linkerId == deviceCheck.id
                                                                    && !x.endDate.HasValue).FirstOrDefaultAsync();
                    if (recordStatus != null)
                        recordStatus.endDate = DateTime.Now;
                    await dBContext.SaveChangesAsync();
                    return Ok("Device is turned off.");
                }

            }
            return BadRequest("Device dosen't exists.");
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpPut]
        [Route("Give(Take)Control")]
        public async Task<IActionResult> GiveControl([FromBody] ChangeStatusForDeviceDto status)
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

                    Guid prosumerId = Guid.Parse(nameId);
                    var deviceCheck = await dBContext.linkers.FirstOrDefaultAsync(x => x.id == status.linkerId);

                    if (deviceCheck != null)
                    {
                        if (deviceCheck.control == false)
                        {
                            deviceCheck.control = true;
                            deviceCheck.access = true;
                            await dBContext.SaveChangesAsync();
                            return Ok("Control is given.");
                        }
                        else
                        {
                            deviceCheck.control = false;
                            await dBContext.SaveChangesAsync();
                            return Ok("Control is taken.");
                        }

                    }
                    return BadRequest("Device is already added.");
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER")]
        [HttpPut]
        [Route("Allow(Disallow)Access")]
        public async Task<IActionResult> AllowAccess([FromBody] ChangeStatusForDeviceDto status)
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

                    Guid prosumerId = Guid.Parse(nameId);
                    var deviceCheck = await dBContext.linkers.FirstOrDefaultAsync(x => x.id == status.linkerId);

                    if (deviceCheck != null)
                    {
                        if (deviceCheck.access == false)
                        {
                            deviceCheck.access = true;
                            await dBContext.SaveChangesAsync();
                            return Ok("Device allowed.");
                        }
                        else
                        {
                            deviceCheck.access = false;
                            deviceCheck.control = false;
                            await dBContext.SaveChangesAsync();
                            return Ok("Device disallowed.");
                        }

                    }
                    return BadRequest("Device is already added.");
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpPut]
        [Route("SetDeviceName")]
        public async Task<IActionResult> setDeviceName([FromBody] DeviceSetNameDto deviceSetNameDto)
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

                    var device = await dBContext.linkers.Where(x => x.id == deviceSetNameDto.liknerId).FirstOrDefaultAsync();

                    device.prosumerDeviceName = deviceSetNameDto.deviceName;

                    await dBContext.SaveChangesAsync();

                    return Ok("Name set.");
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpDelete]
        [Route("RemoveDevice/{linkerId}")]
        public async Task<IActionResult> RemoveDevice([FromRoute] int linkerId)
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
                    var existingDevice = await dBContext.linkers.FirstOrDefaultAsync(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper() && x.id == linkerId);

                    if (existingDevice != null)
                    {
                        dBContext.Remove(existingDevice);
                        await dBContext.SaveChangesAsync();

                        return Ok("Device removed properly.");
                    }

                    return BadRequest("Device not found.");
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpPut]
        [Route("SetWorkRules")]
        public async Task<IActionResult> SetWorkRules([FromBody] AutoTurnOnOff workRule)
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
                    workRule.id = new Guid();
                    if ((workRule.dateOff != null && workRule.dateOn == null) || (workRule.dateOff == null && workRule.dateOn != null))
                    {
                        //jedan je null
                        dBContext.Add(workRule);
                        await dBContext.SaveChangesAsync();
                        return Ok("Seted work rule.");
                    }
                    else if ((workRule.dateOff != null && workRule.dateOn != null))
                    {
                        //definisano i paljenje i gasenje
                        DateTime today = DateTime.Today;
                        if (workRule.dateOn < today || workRule.dateOff < today)
                            return BadRequest("Bad date");
                        if ((workRule.dateOn < workRule.dateOff) || (workRule.dateOn == workRule.dateOff && workRule.timeOn <= workRule.timeOff))
                        {
                            dBContext.Add(workRule);
                            await dBContext.SaveChangesAsync();
                            return Ok("Seted work rule.");
                        }
                    }
                    return BadRequest("Bad date or time");
                }
                return BadRequest();
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetWorkRules/{linkerId}")]
        public async Task<IActionResult> GetWorkRules([FromRoute] int linkerId)
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
                    var response = await dBContext.autoTurnOnOffs.FirstOrDefaultAsync(x => x.linkerId == linkerId);
                    if(response != null)
                    {
                        var giveResponse = new 
                        {
                          linkerId= response.linkerId,
                          dateOn= response.dateOn,
                          dateOff= response.dateOff,
                          timeOn= response.timeOn,
                          timeOff= response.timeOff,
                        };
                        return Ok(giveResponse);
                    }
                    return BadRequest("Empty");
                }
                return BadRequest();
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpDelete]
        [Route("DeleteWorkRules/{linkerId}")]
        public async Task<IActionResult> DeleteWorkRules([FromRoute] int linkerId)
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
                    var rule = await dBContext.autoTurnOnOffs.FirstOrDefaultAsync(x => x.linkerId == linkerId);
                    if (rule != null)
                    {
                        dBContext.autoTurnOnOffs.Remove(rule);
                        await dBContext.SaveChangesAsync();
                        return Ok();
                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            return BadRequest();
        }

        private string napraviStringOdDatuma(DateTime datum)
        {
            var day = datum.Day;
            var month = datum.Month;
            var year = datum.Year;
            string todayString = "";
            if (day < 10 && month < 10)
            {
                todayString = $"{year}-0{month}-0{day}";
            }
            else if (day < 10)
            {
                todayString = $"{year}-{month}-0{day}";
            }
            else
            {
                todayString = $"{year}-0{month}-{day}";
            }

            return todayString;
        }
        private string napraviNazivMeseca(string datum)
        {
            string[] pomList = datum.Split('-');
            var month = pomList[1];
            var intMonth = Int32.Parse(month);
            string realMonth = "";

            switch (intMonth)
            {
                case 1:
                    realMonth = "Januar";
                    break;
                case 2:
                    realMonth = "Februar";
                    break;
                case 3:
                    realMonth = "Mart";
                    break;
                case 4:
                    realMonth = "April";
                    break;
                case 5:
                    realMonth = "Maj";
                    break;
                case 6:
                    realMonth = "Jun";
                    break;
                case 7:
                    realMonth = "Jul";
                    break;
                case 8:
                    realMonth = "Avgust";
                    break;
                case 9:
                    realMonth = "Septembar";
                    break;
                case 10:
                    realMonth = "Oktobar";
                    break;
                case 11:
                    realMonth = "Novembar";
                    break;
                case 12:
                    realMonth = "Decembar";
                    break;
                default:
                    break;
            }

            var finalString = pomList[2] + ". " + realMonth;
            return finalString;
        }
        private static string prebaciDanNaSrpskiJezik(string dan)
        {
            string str = dan;
            switch (str)
            {
                case "Monday":
                    str = "Ponedeljak";
                    break;
                case "Tuesday":
                    str = "Utorak";
                    break;
                case "Wednesday":
                    str = "Sreda";
                    break;
                case "Thursday":
                    str = "Četvrtak";
                    break;
                case "Friday":
                    str = "Petak";
                    break;
                case "Saturday":
                    str = "Subota";
                    break;
                case "Sunday":
                    str = "Nedelja";
                    break;
                default:
                    break;
            }

            return str;
        }
        private static string prebaci(DateTime date)
        {
            var pom = date.DayOfWeek;
            string str = pom.ToString();
            switch (str)
            {
                case "Monday":
                    str = "Ponedeljak";
                    break;
                case "Tuesday":
                    str = "Utorak";
                    break;
                case "Wednesday":
                    str = "Sreda";
                    break;
                case "Thursday":
                    str = "Četvrtak";
                    break;
                case "Friday":
                    str = "Petak";
                    break;
                case "Saturday":
                    str = "Subota";
                    break;
                case "Sunday":
                    str = "Nedelja";
                    break;
                default:
                    break;
            }
            return str;
        }
        private string prebaciMesecNaSrpskiJezik(string mesec)
        {
            string str = "";
            switch (mesec)
            {
                case "January":
                    str = "Januar";
                    break;
                case "February":
                    str = "Februar";
                    break;
                case "March":
                    str = "Mart";
                    break;
                case "April":
                    str = "April";
                    break;
                case "May":
                    str = "Maj";
                    break;
                case "June":
                    str = "Jun";
                    break;
                case "July":
                    str = "Jul";
                    break;
                case "August":
                    str = "Avgust";
                    break;
                case "September":
                    str = "Septembar";
                    break;
                case "October":
                    str = "Oktobar";
                    break;
                case "November":
                    str = "Novembar";
                    break;
                case "December":
                    str = "Decembar";
                    break;
            }
            return str;
        }
        private List<DateTime> odDatumaDoDatumaListaDan(DateTime date1, DateTime date2)
        {
            List<DateTime> datumi = new List<DateTime>();
            datumi.Add(date1);
            while (true)
            {
                date1 = date1.AddDays(1);
                if (DateTime.Compare(date1.Date, date2.Date) <= 0 && DateTime.Compare(date1.Date, DateTime.Today) <= 0)
                {
                    datumi.Add(date1);
                }
                else
                    break;

            }
            return datumi;
        }
        private static string napraviNazivMesecaOdBroja(int datum)
        {
            string realMonth = "";

            switch (datum)
            {
                case 1:
                    realMonth = "Januar";
                    break;
                case 2:
                    realMonth = "Februar";
                    break;
                case 3:
                    realMonth = "Mart";
                    break;
                case 4:
                    realMonth = "April";
                    break;
                case 5:
                    realMonth = "Maj";
                    break;
                case 6:
                    realMonth = "Jun";
                    break;
                case 7:
                    realMonth = "Jul";
                    break;
                case 8:
                    realMonth = "Avgust";
                    break;
                case 9:
                    realMonth = "Septembar";
                    break;
                case 10:
                    realMonth = "Oktobar";
                    break;
                case 11:
                    realMonth = "Novembar";
                    break;
                case 12:
                    realMonth = "Decembar";
                    break;
                default:
                    break;
            }

            return realMonth;
        }
    }
}
