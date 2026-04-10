using System.Reflection;
using BE1.Config;
using BE1.Repositories;
using BE1.Repositories.Interfaces;
using BE1.Services;
using BE1.Services.Interface;
using BE1.Services.Interfaces;
using DotNetEnv;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// ====================== LOAD .env ======================
Env.Load();   // Load file .env

// ====================== CONFIGURATION ======================
builder.Configuration.AddEnvironmentVariables();

// Bind MongoDbSettings từ .env
builder.Services.AddSingleton<MongoDbSettings>(sp =>
{
    return new MongoDbSettings
    {
        ConnectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
            ?? throw new InvalidOperationException("MONGODB_CONNECTION_STRING is missing in .env file"),

        DatabaseName = Environment.GetEnvironmentVariable("MONGODB_DATABASE_NAME") 
            ?? "blogprograming_dev"
    };
});

// ====================== MONGODB ======================
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<MongoDbSettings>();
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddSingleton(sp =>
{
    var settings = sp.GetRequiredService<MongoDbSettings>();
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

//REPOSITORIES
// ====================== REPOSITORIES ======================
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IReactionRepository, ReactionRepository>();
builder.Services.AddScoped<IFollowRepository, FollowRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
// ====================== SERVICES ======================
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();
// Thêm các service khác sau này ở đây
// builder.Services.AddScoped<IPostService, PostService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Blog Programming API",
        Version = "v1",
        Description = "RESTful API cho Blog sử dụng MongoDB Atlas"
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
        options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

// ====================== MIDDLEWARE ======================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Blog API v1");
        c.RoutePrefix = string.Empty; // Swagger mở trực tiếp tại root
    });
}
app.UseCors("AllowAll");
app.UseHttpsRedirection();
// app.UseAuthorization();
app.MapControllers();
app.Run();