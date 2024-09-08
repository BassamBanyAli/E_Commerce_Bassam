using E_Commerce.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using E_Commerce.DTOs;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services to the container.
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));

builder.Services.AddTransient<EmailService>(); // Register your EmailService
builder.Services.AddControllers();

// Add configuration for SMTP settings
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));






builder.Services.AddScoped<PasswordHasher<User>>(); // Register PasswordHasher<User>
builder.Services.AddSingleton<TokenGenerator>(); // or .AddTransient<TokenGenerator>()

// Retrieve JWT settings from configuration
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = jwtSettings.GetValue<string>("Key");
var issuer = jwtSettings.GetValue<string>("Issuer");
var audience = jwtSettings.GetValue<string>("Audience");

// Ensure values are not null
if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
{
    throw new InvalidOperationException("JWT settings are not properly configured.");
}

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });





//for front end
builder.Services.AddCors(options =>

options.AddPolicy("Development", builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
})


);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Facebook";
    options.DefaultChallengeScheme = "Facebook";
})
.AddFacebook(opt =>
{
    opt.ClientId = "your-facebook-client-id";
    opt.ClientSecret = "your-facebook-client-secret";
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Development");

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();

app.Run();
