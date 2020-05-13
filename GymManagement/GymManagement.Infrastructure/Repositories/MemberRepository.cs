using Dapper;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace GymManagement.Infrastructure.Repositories
{
    public class MemberRepository : /*BaseRepository,*/ IMemberRepository
    {
        private readonly IConfiguration _configuration;
        protected IDbConnection con;
        public MemberRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<int> Add(Member entity)
        {
            entity.ExpirationDate.ToString("dd-MM-yyyy");
            entity.DOB.ToString("dd-MM-yyyy");
            entity.RegistrationDate = DateTime.Now;

            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CodeMember", entity.CodeMember);
                parameters.Add("@FullName", entity.FullName);
                parameters.Add("@DOB", entity.DOB);
                parameters.Add("@Address", entity.Address);
                parameters.Add("@RegistrationDate", entity.RegistrationDate);
                parameters.Add("@ExpirationDate", entity.ExpirationDate);
                parameters.Add("@Status", entity.Status);
                parameters.Add("@Image", entity.Image);
                parameters.Add("@PhoneNumber", entity.PhoneNumber);
                parameters.Add("@Email", entity.Email);
                parameters.Add("@Sex", entity.Sex);
                parameters.Add("@TypeOfSeviceId", entity.TypeOfSeviceId);

                var id = await SqlMapper.ExecuteScalarAsync<int>(con, "sp_CreateOrUpdateMember", param: parameters, commandType: CommandType.StoredProcedure);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<int> Delete(int id)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@MaNV ", id);
                var result = await SqlMapper.ExecuteScalarAsync<int>(con, "sp_DeleteMenberById", param: parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<Member> Get(int id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", id);
            Member Member = SqlMapper.Query<Member>(con, "LayPhongBanID", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return Member;
        }

        public async Task<IEnumerable<Member>> GetAll()
        {
            IEnumerable<Member> listMember = await SqlMapper.QueryAsync<Member>(con, "sp_GetAllMember", commandType: CommandType.StoredProcedure);
            return listMember;
        }

        //public async Task<IEnumerable<Member>> GetAll()
        //{
        //    using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        //    {
        //        connection.Open();
        //        IEnumerable<Member> listMember = await SqlMapper.QueryAsync<Member>(con, "sp_GetAllMember", commandType: CommandType.StoredProcedure);
        //        return listMember;
        //    }
        //}

        public async Task<int> Update(Member entity)
        {
            entity.ExpirationDate.ToString("dd-MM-yyyy");
            entity.DOB.ToString("dd-MM-yyyy");
            entity.RegistrationDate = DateTime.Now;

            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", entity.Id);
                parameters.Add("@FullName", entity.FullName);
                parameters.Add("@DOB", entity.DOB);
                parameters.Add("@Address", entity.Address);
                parameters.Add("@ExpirationDate", entity.ExpirationDate);
                parameters.Add("@Status", entity.Status);
                parameters.Add("@Image", entity.Image);
                parameters.Add("@PhoneNumber", entity.PhoneNumber);
                parameters.Add("@Email", entity.Email);
                parameters.Add("@Sex", entity.Sex);
                parameters.Add("@TypeOfSeviceId", entity.TypeOfSeviceId);

                var id = await SqlMapper.ExecuteScalarAsync<int>(con, "sp_CreateOrUpdateMember", param: parameters, commandType: CommandType.StoredProcedure);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
