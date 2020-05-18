using GymManagement.Application.Members.Commands;
using GymManagement.Application.Members.Dto;
using GymManagement.Application.Members.Queries;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GymManagement.Api.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]
    public class MembersController : ApiController
    {
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<int>> Create([FromBody] CreateMemberCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("CreateMember")]
        public async Task<ActionResult<int>> CreateMember([FromBody]Member command)
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<List<MemberDto>>> GetAll()
        {
            return await Mediator.Send(new GetAllMembersQuery());
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<MemberDto>> Get(int id)
        {
            return await Mediator.Send(new GetMemberByIdQuery { Id = id });
        }

        [HttpPut]
        [Route("Update")]
        public async Task<ActionResult<int>> Update(UpdateMemberCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            return await Mediator.Send(new DeleteMemberCommand { Id = id });
        }
    }
}