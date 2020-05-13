using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace GymManagement.Infrastructure.Configuration
{
    public class BaseRepository
    {
        private readonly IConfiguration _configuration;
        protected IDbConnection con;

        public BaseRepository()
        {
            con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
