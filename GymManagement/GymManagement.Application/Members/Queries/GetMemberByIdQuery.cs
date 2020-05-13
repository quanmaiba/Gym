using GymManagement.Application.Members.Dto;
using MediatR;

namespace GymManagement.Application.Members.Queries
{
    public class GetMemberByIdQuery : IRequest<MemberDto>
    {
        public int Id { get; set; }
    }
}
