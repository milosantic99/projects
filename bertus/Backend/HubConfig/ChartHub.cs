using Microsoft.AspNetCore.SignalR;

namespace Bertus_Igrannonica.HubConfig
{
    public class ChartHub : Hub
    {
        public string GetConnectionId() => Context.ConnectionId;
    }
}
