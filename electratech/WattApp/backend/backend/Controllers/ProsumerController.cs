using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProsumerController : Controller
    {
        private readonly WattAppDBContext dBContext;

        private static readonly HttpClient client = new HttpClient();

        public ProsumerController(WattAppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [Authorize(Roles = "ROLE_DSO")]
        [HttpGet]
        [Route("GetAllDsoProsumers")]
        public async Task<IActionResult> getAllDsoProusumers()
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
                    var prosumers = await dBContext.prosumers.Where(x => x.idDso.ToString().ToUpper() == id.ToString().ToUpper()).ToListAsync();
                    return Ok(prosumers);
                }

                return BadRequest();
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetProsumer")]
        public async Task<IActionResult> getProusumer()
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
                    var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());
                    if (prosumer != null)
                    {
                        DateTime date = DateTime.Now;
                        DateTime firstDayOfTheMonth = new DateTime(date.Year, date.Month, 1);

                        var consumption = await (
                                                  from l in dBContext.linkers
                                                  join r in dBContext.records on l.id equals r.linkerId
                                                  where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                                                                          && DateTime.Compare(r.date.Date, DateTime.Today.Date) <= 0
                                                                                          && DateTime.Compare(r.date.Date, firstDayOfTheMonth.Date) >= 0
                                                                                          && r.currentConsumption > 0
                                                  select r.currentConsumption
                                                ).SumAsync();

                        //var consumption = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, DateTime.Today.Date) <= 0
                        //                                        && DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
                        //                                        && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                        //                                        && x.currentConsumption > 0
                        //                                        ).SumAsync(x => x.currentConsumption);

                        double debit = Math.Round(consumption / 1000 * 7.5, 2);

                        ProsumerBasicInformationForDsoDto prosumerDto = new ProsumerBasicInformationForDsoDto(prosumer.firstName, prosumer.lastName, prosumer.email, prosumer.address, prosumer.city, debit, prosumer.image, prosumer.idDso);

                        return Ok(prosumerDto);
                    }
                    return NotFound("Prosumer not found");
                }

                return BadRequest();
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetProsumerForSettingsPage")]
        public async Task<IActionResult> GetProsumerForSettingsPage()
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
                    var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());
                    if (prosumer != null)
                    {
                        return Ok(new
                        {
                            firstName = prosumer.firstName,
                            lastName = prosumer.lastName,
                            city = prosumer.city,
                            address = prosumer.address,
                            email = prosumer.email,
                            phoneNumber = prosumer.phoneNumber,
                            image = prosumer.image
                        });
                    }
                    return NotFound("Prosumer not found");
                }

                return BadRequest();
            }
            return BadRequest();
        }

        

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetProsumerForDso")]
        public async Task<IActionResult> getProusumerForDso([FromBody] string id)
        {
            var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());
            if (prosumer != null)
            {
                return Ok(prosumer);
            }
            return NotFound("Prosumer not found");
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetBasicProusumerInfoForDso/{prosumerId}")]
        public async Task<IActionResult> getBasicProusumerInfoForDso([FromRoute] string prosumerId)
        {
            var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == prosumerId.ToString().ToUpper());

            if (prosumer != null)
            {
                DateTime date = DateTime.Now;
                DateTime firstDayOfTheMonth = new DateTime(date.Year, date.Month, 1);

                var consumption = await (
                                                  from l in dBContext.linkers
                                                  join r in dBContext.records on l.id equals r.linkerId
                                                  where l.prosumerId.ToString().ToUpper() == prosumerId.ToString().ToUpper()
                                                                                          && DateTime.Compare(r.date.Date, DateTime.Today.Date) <= 0
                                                                                          && DateTime.Compare(r.date.Date, firstDayOfTheMonth.Date) >= 0
                                                                                          && r.currentConsumption > 0
                                                  select r.currentConsumption
                                                ).SumAsync();

                //var consumption = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, DateTime.Today.Date) <= 0
                //                                                && DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
                //                                                && x.prosumerId.ToString().ToUpper() == prosumerId.ToUpper()
                //                                                && x.currentConsumption > 0
                //                                                ).SumAsync(x => x.currentConsumption);

                double debit = Math.Round(consumption / 1000 * 7.5, 2);
                ProsumerBasicInformationForDsoDto info = new(prosumer.firstName, prosumer.lastName, prosumer.email, prosumer.address, prosumer.city, debit,prosumer.image, prosumer.idDso);

                return Ok(info);
            }

             return NotFound("Prosumer not found");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpGet]
        [Route("GetBasicProusumerInfoForProsumer")]
        public async Task<IActionResult> GetBasicProusumerInfoForProsumer()
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
                    var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (prosumer != null)
                    {
                        DateTime date = DateTime.Now;
                        DateTime firstDayOfTheMonth = new DateTime(date.Year, date.Month, 1);

                        var consumption = await (
                                                  from l in dBContext.linkers
                                                  join r in dBContext.records on l.id equals r.linkerId
                                                  where l.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                                                                                          && DateTime.Compare(r.date.Date, DateTime.Today.Date) <= 0
                                                                                          && DateTime.Compare(r.date.Date, firstDayOfTheMonth.Date) >= 0
                                                                                          && r.currentConsumption > 0
                                                  select r.currentConsumption
                                                ).SumAsync();

                        //var consumption = await dBContext.records.Where(x => DateTime.Compare(x.date.Date, DateTime.Today.Date) <= 0
                        //                                                && DateTime.Compare(x.date.Date, firstDayOfTheMonth.Date) >= 0
                        //                                                && x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()
                        //                                                && x.currentConsumption > 0
                        //                                                ).SumAsync(x => x.currentConsumption);

                        double debit = Math.Round(consumption / 1000 * 7.5, 2);
                        ProsumerBasicInformationForDsoDto info = new (prosumer.firstName, prosumer.lastName, prosumer.email, prosumer.address, prosumer.city, debit, prosumer.image, prosumer.idDso);

                        return Ok(info);
                    }

                    return NotFound("Prosumer not found");
                }
                return BadRequest("User not valid");
            }
            return BadRequest("User not valid");

        }

        [Authorize(Roles = "ROLE_DISPATCHER, ROLE_DSO")]
        [HttpPost]
        [Route("RegisterProsumer")]
        public async Task<IActionResult> addProsumer([FromBody] ProsumerDtoRegister prosumerDto)
        {
            var prosumerCheck = await dBContext.prosumers.FirstOrDefaultAsync(x => x.email == prosumerDto.email);
            Prosumer prosumer = new Prosumer();

            if (prosumerCheck == null)
            {
                var dso = await dBContext.dsos.FirstOrDefaultAsync(x => x.email.Equals("electra@gmail.com"));

                prosumer.id = Guid.NewGuid();
                prosumer.firstName = prosumerDto.firstName;
                prosumer.lastName = prosumerDto.lastName;
                prosumer.email = prosumerDto.email;
                prosumer.password = BCrypt.Net.BCrypt.HashPassword(prosumerDto.password);
                prosumer.token = "";
                prosumer.role = Enums.RoleName.ROLE_PROSUMER;
                prosumer.idDso = dso.id;
                prosumer.image = "";
                prosumer.city = prosumerDto.city;
                prosumer.address = prosumerDto.address;
                prosumer.phoneNumber = prosumerDto.phoneNumber;
                prosumer.simulation = false;
                prosumer.x = prosumerDto.x;
                prosumer.y = prosumerDto.y;

                await dBContext.prosumers.AddAsync(prosumer);
                await dBContext.SaveChangesAsync();
                return Ok(prosumer);
            }
            return BadRequest("Prosumer with this email already exists");
        }

        [HttpPost]
        [Route("RegisterSimulatedProsumer")]
        public async Task<IActionResult> addSimuatedProsumer([FromBody] ProsumerDtoRegister prosumerDto)
        {
            var prosumerCheck = await dBContext.prosumers.FirstOrDefaultAsync(x => x.email == prosumerDto.email);
            Prosumer prosumer = new Prosumer();

            if (prosumerCheck == null)
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.AcceptLanguage.Add(new StringWithQualityHeaderValue("sr-Latn"));

                HttpResponseMessage response = await client.GetAsync($"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={prosumerDto.x.ToString(System.Globalization.CultureInfo.InvariantCulture).Replace(',', '.')}&lon={prosumerDto.y.ToString(System.Globalization.CultureInfo.InvariantCulture).Replace(',', '.')}&email=anticm57@gmail.com");
                var responseBody = await response.Content.ReadAsStringAsync();

                using var document = JsonDocument.Parse(responseBody);

                var dso = await dBContext.dsos.Where(x => x.email.Equals("electra@gmail.com")).FirstOrDefaultAsync();
                prosumer.id = Guid.NewGuid();
                prosumer.firstName = prosumerDto.firstName;
                prosumer.lastName = prosumerDto.lastName;
                prosumer.email = prosumerDto.email;
                prosumer.password = BCrypt.Net.BCrypt.HashPassword(prosumerDto.password);
                prosumer.token = "";
                prosumer.role = Enums.RoleName.ROLE_PROSUMER;
                string id = dso.id.ToString();
                Guid dsoId = Guid.Parse(id);
                prosumer.idDso = dsoId;
                prosumer.image = "";
                prosumer.city = prosumerDto.city;
                prosumer.address = document.RootElement.GetProperty("address").GetProperty("road").ToString();
                prosumer.phoneNumber = prosumerDto.phoneNumber;
                prosumer.simulation = prosumerDto.simulation;
                prosumer.x = prosumerDto.x;
                prosumer.y = prosumerDto.y;

                await dBContext.prosumers.AddAsync(prosumer);
                await dBContext.SaveChangesAsync();
                return Ok(prosumer);
            }
            return BadRequest("Prosumer with this email already exists");
        }

        [HttpPost]
        [Route("RegisterProsumerSolo")]
        public async Task<IActionResult> addProsumerSolo([FromBody] ProsumerRegisterSoloDto prosumerDto)
        {
            var prosumerCheck = await dBContext.prosumers.FirstOrDefaultAsync(x => x.email == prosumerDto.email);
            Prosumer prosumer = new Prosumer();

            if (prosumerCheck == null)
            {
                prosumer.id = Guid.NewGuid();
                prosumer.firstName = prosumerDto.firstName;
                prosumer.lastName = prosumerDto.lastName;
                prosumer.email = prosumerDto.email;
                prosumer.password = BCrypt.Net.BCrypt.HashPassword(prosumerDto.password);
                prosumer.token = "";
                prosumer.role = Enums.RoleName.ROLE_PROSUMER_DEMO;
                prosumer.idDso = Guid.Empty;
                prosumer.image = "";
                prosumer.city = prosumerDto.city;
                prosumer.address = prosumerDto.address;
                prosumer.phoneNumber = prosumerDto.phoneNumber;
                prosumer.simulation = false;
                prosumer.x = prosumerDto.x;
                prosumer.y = prosumerDto.y;

                await dBContext.prosumers.AddAsync(prosumer);
                await dBContext.SaveChangesAsync();

                return Ok(prosumer);
            }
            return BadRequest("Prosumer with this email already exists");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpPut]
        [Route("UpdateProsumer")]
        public async Task<IActionResult> updateProsumer([FromBody] ProsumerDtoEdit prosumer)
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
                    var existingProsumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (existingProsumer != null)
                    {
                        var prosumerCheck = await dBContext.prosumers.FirstOrDefaultAsync(x => x.email == prosumer.email && x.id.ToString().ToUpper() != id.ToString().ToUpper());
                        if (prosumerCheck == null)
                        {
                            if(prosumer.password.IsNullOrEmpty())
                            {
                                existingProsumer.firstName = prosumer.firstName;
                                existingProsumer.lastName = prosumer.lastName;
                                existingProsumer.email = prosumer.email;
                                existingProsumer.phoneNumber = prosumer.phoneNumber;
                            }
                            else
                            {
                                existingProsumer.firstName = prosumer.firstName;
                                existingProsumer.lastName = prosumer.lastName;
                                existingProsumer.email = prosumer.email;
                                existingProsumer.phoneNumber = prosumer.phoneNumber;
                                existingProsumer.password = BCrypt.Net.BCrypt.HashPassword(prosumer.password);
                            }
                            await dBContext.SaveChangesAsync();
                            return Ok(existingProsumer);
                        }
                        return BadRequest("Prosumer with this email already exists");
                    }
                    return NotFound("Prosumer not found");
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpPut]
        [Route("ChangeImageProsumer")]
        public async Task<IActionResult> changeImage([FromBody] ImageDto imgInBase64)
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
                    var dso = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (dso == null)
                    {
                        return NotFound("Prosumer not found.");
                    }

                    dso.image = imgInBase64.image;

                    await dBContext.SaveChangesAsync();
                    return Ok("Image changed.");
                }
                return BadRequest();
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO")]
        [HttpPut]
        [Route("DeleteProsumerDso/{prosumerId}")]
        public async Task<IActionResult> deleteProsumerDso([FromRoute] string prosumerId)
        {
            var existingProsumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == prosumerId.ToString().ToUpper());

            if (existingProsumer != null)
            {
                existingProsumer.role = Enums.RoleName.ROLE_PROSUMER_DEMO;

                await dBContext.SaveChangesAsync();

                return Ok("Prosumer deleted from your system.");
            }

            return NotFound("Prosumer not found");
        }

        [Authorize(Roles = "ROLE_PROSUMER, ROLE_PROSUMER_DEMO")]
        [HttpDelete]
        [Route("DeleteProsumer")]
        public async Task<IActionResult> deleteProsumer()
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
                    var existingProsumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (existingProsumer != null)
                    {

                        if (existingProsumer.idDso.ToString() == Guid.Empty.ToString().ToUpper())
                        {
                            dBContext.prosumers.Remove(existingProsumer);
                            await dBContext.SaveChangesAsync();
                            return Ok("Prosumer removed.");
                        }
                        else
                        {
                            var prosumerRequest = await dBContext.notifications.FirstOrDefaultAsync(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper());

                            if (prosumerRequest != null)
                                return BadRequest("Request is already sent.");

                            Notification notification = new Notification();

                            notification.prosumerId = id;
                            notification.dsoId = existingProsumer.idDso;
                            notification.notificationType = "Delete request";

                            await dBContext.notifications.AddAsync(notification);
                            await dBContext.SaveChangesAsync();

                            return Ok("Delete request sent.");
                        }
                    }

                    return NotFound("Prosumer not found");
                }

                return BadRequest();
            }

            return BadRequest();
        }
    }
}
