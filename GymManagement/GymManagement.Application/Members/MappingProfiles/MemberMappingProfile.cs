using AutoMapper;
using GymManagement.Application.Members.Commands;
using GymManagement.Application.Members.Dto;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Members.MappingProfiles
{

    public class MemberMappingProfile : Profile
    {
        public MemberMappingProfile()
        {
            CreateMap<CreateMemberCommand, Member>();
            CreateMap<UpdateMemberCommand, Member>();
            CreateMap<Member, MemberDto>()
                .ForMember(d => d.DOB, o => o.MapFrom(s => s.DOB.ToString("dd/MM-yyyy")))
                .ForMember(d => d.ExpirationDate, o => o.MapFrom(s => s.ExpirationDate.ToString("dd-MM-yyyy")))
                .ForMember(d => d.RegistrationDate, o => o.MapFrom(s => s.RegistrationDate.ToString("dd-MM-yyyy HH':'mm':'ss")))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status ? "Đang Hoạt Động" : "Không Hoạt Động"))
                .ForMember(d => d.Gender, o => o.MapFrom(s => s.Sex ? "Nam" : "Nữ"));
        }
    }
}
