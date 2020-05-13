using AutoMapper;
using GymManagement.Application.Interfaces;
using GymManagement.Application.Members.Commands;
using GymManagement.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace GymManagement.Application.Members.Handlers
{
    public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateMemberCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<int> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Members.Add(_mapper.Map<Member>(request));
            return result;
        }
    }
}
