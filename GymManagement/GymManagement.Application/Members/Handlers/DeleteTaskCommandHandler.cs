using GymManagement.Application.Interfaces;
using GymManagement.Application.Members.Commands;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace GymManagement.Application.Members.Handlers
{
    public class DeleteMemberCommandHandler : IRequestHandler<DeleteMemberCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteMemberCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<int> Handle(DeleteMemberCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Members.Delete(request.Id);
            return result;
        }
    }
}
