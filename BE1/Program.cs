using System.Reflection;
using System.Text;
using BE1.Config;
using BE1.Repositories;
using BE1.Repositories.Interfaces;
using BE1.Services;
using BE1.Services.Interface;
using BE1.Services.Interfaces;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;

// ====================== LOAD .env ======================
Env.Load();

// Tắt claim mapping mặc định của JWT
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

// ====================== CORS ======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)  // ← cho phép MỌI origin kể cả null
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();             // ← cho phép gửi cookie (refresh token)
    });
});

// ====================== MONGODB ======================
builder.Services.AddSingleton<MongoDbSettings>(sp => new MongoDbSettings
{
    ConnectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
        ?? throw new InvalidOperationException("MONGODB_CONNECTION_STRING is missing in .env"),
    DatabaseName = Environment.GetEnvironmentVariable("MONGODB_DATABASE_NAME")
        ?? "blogprograming_dev"
});

builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(sp.GetRequiredService<MongoDbSettings>().ConnectionString));

builder.Services.AddSingleton(sp =>
{
    var settings = sp.GetRequiredService<MongoDbSettings>();
    var client   = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

// ====================== JWT ======================
var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET")
    ?? throw new InvalidOperationException("JWT_SECRET is missing in .env");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.MapInboundClaims = false; // ← tắt map claim tự động
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer           = false,
        ValidateAudience         = false,
        ValidateLifetime         = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ClockSkew                = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// ====================== REPOSITORIES ======================
builder.Services.AddScoped<IUserRepository,         UserRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IPostRepository,         PostRepository>();
builder.Services.AddScoped<ITagRepository,          TagRepository>();
builder.Services.AddScoped<ICommentRepository,      CommentRepository>();
builder.Services.AddScoped<IReactionRepository,     ReactionRepository>();
builder.Services.AddScoped<IFollowRepository,       FollowRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

// ====================== SERVICES ======================
builder.Services.AddScoped<IAuthService,    AuthService>();
builder.Services.AddScoped<IUserService,    UserService>();
builder.Services.AddScoped<IPostService,    PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();

// ====================== SWAGGER ======================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title       = "Blog Programming API",
        Version     = "v1",
        Description = "RESTful API cho Blog sử dụng MongoDB"
    });

    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name         = "Authorization",
        Type         = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme       = "bearer",
        BearerFormat = "JWT",
        In           = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description  = "Nhập access token. Ví dụ: Bearer eyJhbGci..."
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id   = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
        options.IncludeXmlComments(xmlPath);
});

// ====================== BUILD ======================
var app = builder.Build();

// ====================== MIDDLEWARE ======================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Blog API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");     // ← phải trước Authentication
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();