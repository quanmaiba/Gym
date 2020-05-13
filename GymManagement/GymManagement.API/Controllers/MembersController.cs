using GymManagement.Application.Members.Commands;
using GymManagement.Application.Members.Dto;
using GymManagement.Application.Members.Queries;
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
        [Route("apiCreate")]
        public async Task<ActionResult<int>> Create(CreateMemberCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<List<MemberDto>>> GetAll()
        {
            return await Mediator.Send(new GetAllMembersQuery());
        }

        [HttpGet("/{id}")]
        public async Task<ActionResult<MemberDto>> Get(int id)
        {
            return await Mediator.Send(new GetMemberByIdQuery { Id = id });
        }

        [HttpPut]
        public async Task<ActionResult<int>> Update(UpdateMemberCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete]
        public async Task<ActionResult<int>> Delete(int id)
        {
            return await Mediator.Send(new DeleteMemberCommand { Id = id });
        }
    }
}