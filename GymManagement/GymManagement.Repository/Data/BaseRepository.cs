using System.Data;

namespace GymManagement.Repository.Data
{
    public class BaseRepository
    {
        protected IDbConnection con;
        public BaseRepository()
        {

            string connectString = @"Server=DESKTOP-NTNOUNK;Database=InventoryManagement;Trusted_Connection=True;";
            con = new SqlConnection(connectString);
            ////
            ///
            //string connectStrings = @"Server=DESKTOP-NTNOUNK;User ID=sa;Password=12345;Database=InventoryManagement1;Trusted_Connection=True;";
            //con = new SqlConnection(connectStrings);

        }
    }
}
