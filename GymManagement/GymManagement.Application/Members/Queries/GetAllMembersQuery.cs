using GymManagement.Application.Members.Dto;
using MediatR;
using System.Collections.Generic;

namespace GymManagement.Application.Members.Queries
{
    public class GetAllMembersQuery : IRequest<List<MemberDto>>
    {
    }
}
