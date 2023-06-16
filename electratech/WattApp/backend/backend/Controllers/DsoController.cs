using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DsoController : ControllerBase
    {
        private readonly WattAppDBContext dbContext;

        public DsoController(WattAppDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [Authorize (Roles ="ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetAllDsos")]
        public async Task<IActionResult> getAllDsos()
        {
            var dsos = await dbContext.dsos.ToListAsync();
            return Ok(dsos);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetDsoById")]
        public async Task<IActionResult> getDsoById()
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

                    var dso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (dso == null)
                    {
                        return NotFound("Dso not found.");
                    }
                    GetDsoByIdDto getDso = new GetDsoByIdDto();
                    getDso.ownerFirstName = dso.ownerFirstName;
                    getDso.ownerLastName = dso.ownerLastName;
                    getDso.companyName = dso.companyName;
                    getDso.email = dso.email;
                    getDso.address = dso.address;
                    getDso.image = dso.image;

                    return Ok(getDso);
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetDispatcherByCompanyName/{companyName}")]
        public async Task<IActionResult> GetDispatcherByComapnyName([FromRoute] string companyName)
        {
            var dispatchers = await dbContext.dsos.Where(x => x.companyName == companyName && x.role == Enums.RoleName.ROLE_DISPATCHER).ToListAsync();

            if (dispatchers == null)
            {
                return NotFound("No dispatcher found.");
            }
            return Ok(dispatchers);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetAllDsosByDsoRole")]
        public async Task<IActionResult> getAllDsosByDsoRole()
        {
            var dsos = await dbContext.dsos.ToListAsync();

            List<Dso> dsosRoleDso = new List<Dso>();

            foreach(var dso in dsos)
            {
                if (dso.role == Enums.RoleName.ROLE_DSO)
                    dsosRoleDso.Add(dso);
            }

            return Ok(dsosRoleDso);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetBasicInformationsForDso")]
        public async Task<IActionResult> getBasicInformationsForDso()
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

                    var dso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (dso == null)
                    {
                        return NotFound("Dso not found.");
                    }

                    DsoBasicInformations info = new DsoBasicInformations(dso.ownerFirstName, dso.ownerLastName, dso.email, dso.image);

                    return Ok(info);
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [HttpPost]
        [Route("RegisterDso")]
        public async Task<IActionResult> addDso([FromBody] DsoDtoRegister dsoDto)
        {
            var dsoCheck = await dbContext.dsos.FirstOrDefaultAsync(x => x.email == dsoDto.email);
            Dso dso = new Dso();

            if (dsoCheck == null)
            {
                dsoCheck = await dbContext.dsos.FirstOrDefaultAsync(x => x.companyName == dsoDto.companyName);

                if (dsoCheck == null)
                {
                    dso.id = Guid.NewGuid();
                    dsoDto.password = BCrypt.Net.BCrypt.HashPassword(dsoDto.password);
                    dso.address = dsoDto.address;
                    dso.companyName = dsoDto.companyName;
                    dso.email = dsoDto.email;
                    dso.ownerFirstName = dsoDto.ownerFirstName;
                    dso.ownerLastName = dsoDto.ownerLastName;
                    dso.password = dsoDto.password;
                    dso.role = Enums.RoleName.ROLE_DSO;
                    dso.token = "";
                    dso.image = "";

                    await dbContext.dsos.AddAsync(dso);
                    await dbContext.SaveChangesAsync();
                    //return CreatedAtAction(nameof(GetProsumer), new {id = prosumer.id}, prosumer);
                    return Ok(dso);
                }

                return BadRequest("Company name already exists.");

            }
            return BadRequest("Dso with this email already exists.");
        }

        [Authorize(Roles = "ROLE_DSO")]
        [HttpPost]
        [Route("RegisterDispatcher")]
        public async Task<IActionResult> addDispatcher([FromBody] DispatcherDtoReg dispatcherDto)
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

                    var dsoCheck = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());
                    Dso dso = new Dso();

                    if (dsoCheck != null && dsoCheck.role == Enums.RoleName.ROLE_DSO) // ako sam dso mogu da dodam dispecera
                    {
                        var disp = await dbContext.dsos.FirstOrDefaultAsync(x => x.email.Equals(dispatcherDto.email));

                        if (disp == null)
                        {
                            dso.id = Guid.NewGuid();
                            dispatcherDto.password = BCrypt.Net.BCrypt.HashPassword(dispatcherDto.password);
                            dso.address = dispatcherDto.address;
                            dso.companyName = dsoCheck.companyName;
                            dso.email = dispatcherDto.email;
                            dso.ownerFirstName = dispatcherDto.FirstName;
                            dso.ownerLastName = dispatcherDto.LastName;
                            dso.password = dispatcherDto.password;
                            dso.role = Enums.RoleName.ROLE_DISPATCHER;
                            dso.token = "";
                            dso.image = "";

                            await dbContext.dsos.AddAsync(dso);
                            await dbContext.SaveChangesAsync();

                            return Ok(dso);
                        }

                        return BadRequest("Email aleready exists.");

                    }
                    return BadRequest("Dso id invalid.");
                }
                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPut]
        [Route("EditDso")]
        public async Task<IActionResult> editDso([FromBody] DsoDtoOtherEdit dsoDto)
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
                    var dso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (dso == null)
                    {
                        return NotFound("Dso not found.");
                    }

                    if (!String.IsNullOrEmpty(dsoDto.email) && !String.IsNullOrEmpty(dsoDto.companyName) && !String.IsNullOrEmpty(dsoDto.firstName) && !String.IsNullOrEmpty(dsoDto.lastName) && !String.IsNullOrEmpty(dsoDto.adress))
                    {
                        dso.email = dsoDto.email;
                        dso.companyName = dsoDto.companyName;
                        dso.ownerFirstName = dsoDto.firstName;
                        dso.ownerLastName = dsoDto.lastName;
                        dso.address = dsoDto.adress;
                        await dbContext.SaveChangesAsync();
                        return Ok("Dso edit succeed.");
                    }

                    if (!String.IsNullOrEmpty(dsoDto.email) && String.IsNullOrEmpty(dsoDto.companyName) && !String.IsNullOrEmpty(dsoDto.firstName) && !String.IsNullOrEmpty(dsoDto.lastName) && !String.IsNullOrEmpty(dsoDto.adress))
                    {
                        dso.email = dsoDto.email;
                        dso.ownerFirstName = dsoDto.firstName;
                        dso.ownerLastName = dsoDto.lastName;
                        dso.address = dsoDto.adress;
                        await dbContext.SaveChangesAsync();
                        return Ok("Dso edit succeed.");
                    }

                    if (String.IsNullOrEmpty(dsoDto.email) && !String.IsNullOrEmpty(dsoDto.companyName) && !String.IsNullOrEmpty(dsoDto.firstName) && !String.IsNullOrEmpty(dsoDto.lastName) && !String.IsNullOrEmpty(dsoDto.adress))
                    {
                        dso.companyName = dsoDto.companyName;
                        dso.ownerFirstName = dsoDto.firstName;
                        dso.ownerLastName = dsoDto.lastName;
                        dso.address = dsoDto.adress;
                        await dbContext.SaveChangesAsync();
                        return Ok("Dso edit succeed.");
                    }

                    if (!String.IsNullOrEmpty(dsoDto.email) && !String.IsNullOrEmpty(dsoDto.companyName) && String.IsNullOrEmpty(dsoDto.firstName) && !String.IsNullOrEmpty(dsoDto.lastName) && !String.IsNullOrEmpty(dsoDto.adress))
                    {
                        dso.email = dsoDto.email;
                        dso.companyName = dsoDto.companyName;
                        dso.ownerLastName = dsoDto.lastName;
                        dso.address = dsoDto.adress;
                        await dbContext.SaveChangesAsync();
                        return Ok("Dso edit succeed.");
                    }

                    if (!String.IsNullOrEmpty(dsoDto.email) && !String.IsNullOrEmpty(dsoDto.companyName) && !String.IsNullOrEmpty(dsoDto.firstName) && String.IsNullOrEmpty(dsoDto.lastName) && !String.IsNullOrEmpty(dsoDto.adress))
                    {
                        dso.email = dsoDto.email;
                        dso.companyName = dsoDto.companyName;
                        dso.ownerFirstName = dsoDto.firstName;
                        dso.address = dsoDto.adress;
                        await dbContext.SaveChangesAsync();
                        return Ok("Dso edit succeed.");
                    }

                    if (!String.IsNullOrEmpty(dsoDto.email) && !String.IsNullOrEmpty(dsoDto.companyName) && !String.IsNullOrEmpty(dsoDto.firstName) && !String.IsNullOrEmpty(dsoDto.lastName) && String.IsNullOrEmpty(dsoDto.adress))
                    {
                        dso.email = dsoDto.email;
                        dso.companyName = dsoDto.companyName;
                        dso.ownerFirstName = dsoDto.firstName;
                        dso.ownerLastName = dsoDto.lastName;
                        await dbContext.SaveChangesAsync();
                        return Ok("Dso edit succeed.");
                    }

                    return BadRequest("Fields email and company name are empty.");
                }
                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPut]
        [Route("EditPasswordDso")]
        public async Task<IActionResult> editPasswordDso([FromBody] DsoDtoPasswordEdit dsoDto)
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
                    var dso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (dso == null)
                    {
                        return NotFound("Dso not found.");
                    }

                    if (dso.email != dsoDto.email)
                    {
                        return BadRequest("Email is not correct.");
                    }

                    dso.password = BCrypt.Net.BCrypt.HashPassword(dsoDto.password);

                    await dbContext.SaveChangesAsync();

                    return Ok("Password changed.");
                }
                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPut]
        [Route("ChangeImage")]
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
                    var dso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == id.ToString().ToUpper());

                    if (dso == null)
                    {
                        return NotFound("Dso not found.");
                    }

                    dso.image = imgInBase64.image;

                    await dbContext.SaveChangesAsync();
                    return Ok("Image changed.");
                }
                return BadRequest();
            }
            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO")]
        [HttpPut]
        [Route("ChangeRole/{dsoId}")]
        public async Task<IActionResult> changeRole([FromRoute] string dsoId)
        {
            var dso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == dsoId.ToUpper());

            if (dso != null) // ako sam dso mogu da dodam dispecera
            {
                if (dso.role == Enums.RoleName.ROLE_DSO)
                    dso.role = Enums.RoleName.ROLE_DISPATCHER;
                else if (dso.role == Enums.RoleName.ROLE_DISPATCHER)
                    dso.role = Enums.RoleName.ROLE_DSO;

                await dbContext.SaveChangesAsync();

                return Ok(dso);

            }

            return BadRequest("Dso id invalid.");
        }

        [Authorize(Roles = "ROLE_DSO")]
        [HttpDelete]
        [Route("DeleteDispatcher/{dispatcherId}")]
        public async Task<IActionResult> deleteDso([FromRoute] string dispatcherId)
        {
            var existingDso = await dbContext.dsos.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == dispatcherId.ToString().ToUpper());

            if (existingDso != null)
            {
                dbContext.dsos.Remove(existingDso);

                await dbContext.SaveChangesAsync();

                return Ok("Dispatcher deleted.");
            }
            return NotFound("Dso not found.");
        }
    }

}
