namespace GymManagement.Application.Members.Dto
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string CodeMember { get; set; }
        public string FullName { get; set; }
        public string DOBS { get; set; }
        public string DOB { get; set; }
        public string Address { get; set; }
        public string RegistrationDate { get; set; }
        public string ExpirationDate { get; set; }
        public string Status { get; set; }
        public string Image { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public int TypeOfServiceId { get; set; }
        public string TypeOfServiceName { get; set; }
    }
}
