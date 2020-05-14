using MediatR;
using System;

namespace GymManagement.Application.Members.Commands
{
    public class CreateMemberCommand : IRequest<int>
    {

        public string CodeMember { get; set; }
        public string FullName { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool Status { get; set; }
        public string Image { get; set; }
        public string PhoneNumber { get; set; }
        //public string Email { get; set; }
        public bool Sex { get; set; }
        public int TypeOfServiceId { get; set; }
    }
}
