using AutoMapper;
using GymManagement.Application.Interfaces;
using GymManagement.Application.Members.Dto;
using GymManagement.Application.Members.Queries;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace GymManagement.Application.Members.Handlers
{
    public class GetAllMembersQueryHandler : IRequestHandler<GetAllMembersQuery, List<MemberDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllMembersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<MemberDto>> Handle(GetAllMembersQuery request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Members.GetAll();
            return _mapper.Map<List<MemberDto>>(result.ToList());
        }
    }
}
