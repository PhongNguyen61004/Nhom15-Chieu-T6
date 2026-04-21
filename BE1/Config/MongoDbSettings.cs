using System;
using System.Collections.Generic;   
using System.Linq;
using System.Threading.Tasks;

namespace BE1.Config
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}