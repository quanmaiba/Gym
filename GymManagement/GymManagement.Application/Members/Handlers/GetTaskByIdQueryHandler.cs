using AutoMapper;
using GymManagement.Application.Interfaces;
using GymManagement.Application.Members.Dto;
using GymManagement.Application.Members.Queries;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace GymManagement.Application.Members.Handlers
{
    public class GetMemberByIdQueryHandler : IRequestHandler<GetMemberByIdQuery, MemberDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetMemberByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<MemberDto> Handle(GetMemberByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Members.Get(request.Id);
            return _mapper.Map<MemberDto>(result);
        }
    }
}
