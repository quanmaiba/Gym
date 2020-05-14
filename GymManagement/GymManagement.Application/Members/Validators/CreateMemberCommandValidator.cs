using FluentValidation;
using GymManagement.Application.Members.Commands;

namespace GymManagement.Application.Members.Validators
{
    public class CreateMemberCommandValidator : AbstractValidator<CreateMemberCommand>
    {
        public CreateMemberCommandValidator()
        {
            RuleFor(t => t.CodeMember).NotEmpty();
            RuleFor(t => t.FullName).NotEmpty();
            RuleFor(t => t.Status).NotNull();
            RuleFor(t => t.Address).NotNull();
            RuleFor(t => t.PhoneNumber).NotEmpty();
            RuleFor(t => t.TypeOfServiceId).NotNull();
            RuleFor(t => t.RegistrationDate).NotNull();
        }

    }
}
