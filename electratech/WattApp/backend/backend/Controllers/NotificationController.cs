using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
    public class NotificationController : ControllerBase
    {
        private readonly WattAppDBContext dBContext;

        public NotificationController(WattAppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetAllNotifications")]
        public async Task<IActionResult> getAllNotifications()
        {
            var notifications = await dBContext.notifications.ToListAsync();

            List<NotificationDto> notif = new List<NotificationDto>();

            foreach (var notification in notifications)
            {
                var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == notification.prosumerId.ToString().ToUpper());

                string prosumerName = prosumer.firstName +" "+prosumer.lastName;
                    
                notif.Add(new NotificationDto(notification.Id, notification.notificationType, prosumer.id, prosumerName, prosumer.image));
            }

            return Ok(notif);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetAllAccessRequestNotifications")]
        public async Task<IActionResult> getAllAccessRequestNotifications()
        {
            var notifications = await dBContext.notifications.Where(x => x.notificationType.Equals("Access request")).ToListAsync();

            if (notifications == null)
                return NotFound("There are no notifications for accept request.");

            List<NotificationDto> notif = new List<NotificationDto>();

            foreach (var notification in notifications)
            {
                var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == notification.prosumerId.ToString().ToUpper());

                string prosumerName = prosumer.firstName + prosumer.lastName;

                notif.Add(new NotificationDto(notification.Id, notification.notificationType, prosumer.id, prosumerName, prosumer.image));
            }

            return Ok(notif);
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpGet]
        [Route("GetAllDeleteRequestNotifications")]
        public async Task<IActionResult> getAllDeleteRequestNotifications()
        {
            var notifications = await dBContext.notifications.Where(x => x.notificationType.Equals("Delete request")).ToListAsync();

            if (notifications == null)
                return NotFound("There are no notifications for accept request.");

            List<NotificationDto> notif = new List<NotificationDto>();

            foreach (var notification in notifications)
            {
                var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id.ToString().ToUpper() == notification.prosumerId.ToString().ToUpper());

                string prosumerName = prosumer.firstName + prosumer.lastName;

                notif.Add(new NotificationDto(notification.Id, notification.notificationType, prosumer.id, prosumerName, prosumer.image));
            }

            return Ok(notif);
        }

        [Authorize(Roles = "ROLE_PROSUMER_DEMO")]
        [HttpPost]
        [Route("AccessRequest")]
        public async Task<IActionResult> accessRequest([FromBody] AccessRequestDto dsoId)
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

                    var inside = this.dBContext.notifications.Where(x => x.prosumerId.ToString().ToUpper() == id.ToString().ToUpper()).FirstOrDefault();

                    if(inside == null)
                    {
                        var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id == id);

                        Notification accessRequest = new Notification();

                        accessRequest.dsoId = dsoId.dsoId;
                        accessRequest.prosumerId = id;
                        accessRequest.notificationType = "Access request";

                        await dBContext.notifications.AddAsync(accessRequest);
                        await dBContext.SaveChangesAsync();
                    }

                    return Ok("Success!");
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPost]
        [Route("AcceptAccessRequest")]
        public async Task<IActionResult> acceptAccessRequest([FromBody] int notificationId)
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
                    var deleteRequest = await dBContext.notifications.Where(x => x.Id == notificationId && x.notificationType.Equals("Access request")).FirstOrDefaultAsync();

                    var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id == deleteRequest.prosumerId);

                    dBContext.notifications.Remove(deleteRequest);
                    await dBContext.SaveChangesAsync();

                    prosumer.idDso = id;
                    prosumer.role = Enums.RoleName.ROLE_PROSUMER;

                    await dBContext.SaveChangesAsync();

                    return Ok("Accepted.");
                }
            }

            return BadRequest();
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPost]
        [Route("DeclineAccessRequest")]
        public async Task<IActionResult> declineAccessRequest([FromBody] int notificationId)
        {
            var deleteRequest = await dBContext.notifications.Where(x => x.Id == notificationId && x.notificationType.Equals("Access request")).FirstOrDefaultAsync();

            dBContext.notifications.Remove(deleteRequest);
            await dBContext.SaveChangesAsync();

            return Ok("Declined.");
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPost]
        [Route("AcceptDeleteRequest")]
        public async Task<IActionResult> acceptDeleteRequest([FromBody] int notifitationId)
        {
            var deleteRequest = await dBContext.notifications.Where(x => x.Id == notifitationId && x.notificationType.Equals("Delete request")).FirstOrDefaultAsync();

            var prosumer = await dBContext.prosumers.FirstOrDefaultAsync(x => x.id == deleteRequest.prosumerId);

            dBContext.notifications.Remove(deleteRequest);
            await dBContext.SaveChangesAsync();

            prosumer.role = Enums.RoleName.ROLE_PROSUMER_DEMO;
            await dBContext.SaveChangesAsync();

            return Ok("Accepted.");
        }

        [Authorize(Roles = "ROLE_DSO, ROLE_DISPATCHER")]
        [HttpPost]
        [Route("DeclineDeleteRequest")]
        public async Task<IActionResult> declineDeleteRequest([FromBody] int notificationId)
        {
            var deleteRequest = await dBContext.notifications.Where(x => x.Id == notificationId && x.notificationType.Equals("Delete request")).FirstOrDefaultAsync();

            dBContext.notifications.Remove(deleteRequest);
            await dBContext.SaveChangesAsync();

            return Ok("Declined.");
        }
    }
}
