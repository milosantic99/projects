using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/Authenticate")]
    public class LoginController : Controller
    {
        private readonly WattAppDBContext dBContext;

        public LoginController(WattAppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [HttpPost]
        public async Task<IActionResult> checkLogin([FromBody] Login loginModel)
        {
            var prosumerCheck = await dBContext.prosumers.FirstOrDefaultAsync(x => x.email == loginModel.email);

            if (prosumerCheck != null) 
            {
                bool isValidPassword = BCrypt.Net.BCrypt.Verify(loginModel.password, prosumerCheck.password); // provera sifre prosumer-a da li je validna

                if (isValidPassword)
                {
                    prosumerCheck.token = CreateJwtProsumer(prosumerCheck);
                    return Ok(new
                    {
                        Token = prosumerCheck.token,
                        Message = "Login Success"
                    });
                }
                return BadRequest("Password is incorrect.");
            }
            var dsoCheck = await dBContext.dsos.FirstOrDefaultAsync(x => x.email == loginModel.email);

            if (dsoCheck != null)
            {
                var isValidPassword = BCrypt.Net.BCrypt.Verify(loginModel.password, dsoCheck.password); // provera sifre dso-a da li je validna
                if (isValidPassword) 
                {
                    dsoCheck.token = CreateJwtDso(dsoCheck);
                    return Ok(new
                    {
                        Token = dsoCheck.token,
                        Message = "Login Success"
                    });
                }
                return BadRequest("Password is incorrecet.");
            }

            return BadRequest("User not found");
        }

        private string CreateJwtProsumer(Prosumer prosumer)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authentication");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, prosumer.role.ToString()),
                new Claim(ClaimTypes.NameIdentifier, prosumer.id.ToString())
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateJwtDso(Dso dso)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authentication");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, dso.role.ToString()),
                new Claim(ClaimTypes.NameIdentifier, dso.id.ToString())
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
