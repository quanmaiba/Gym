using MediatR;

namespace GymManagement.Application.Members.Commands
{
    public class DeleteMemberCommand : IRequest<int>
    {
        public int Id { get; set; }
    }
}
