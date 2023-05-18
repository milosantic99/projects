using Bertus_Igrannonica.Data;
using Bertus_Igrannonica.Hosts;
using Bertus_Igrannonica.HubConfig;
using Bertus_Igrannonica.UserAPI;
using StudentAPI;



var builder = WebApplication.CreateBuilder(args);

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddSignalR();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//enabling CORS
builder.Services.AddCors(options => {

    options.AddPolicy(name: "_myAllowSpecificOrigins",
        builder => {

            builder.WithOrigins(HostUrl.Backend)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

builder.Services.AddTransient<AppDb>(_ => new AppDb(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient<UserDb>(_ => new UserDb(builder.Configuration.GetConnectionString("UsersTableConnection")));

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors(myAllowSpecificOrigins);
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


app.UseAuthorization();

//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers();
//    endpoints.MapHub<ChartHub>("/chart");
//});

app.MapControllers();
app.MapHub<ChartHub>("/chart");

app.Run();
