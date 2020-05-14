using FluentValidation;
using GymManagement.Application.Members.Commands;

namespace GymManagement.Application.Members.Validators
{
    public class UpdateMemberCommandValidator : AbstractValidator<UpdateMemberCommand>
    {
        public UpdateMemberCommandValidator()
        {
            RuleFor(t => t.FullName).NotEmpty();
            RuleFor(t => t.Status).NotNull();
            RuleFor(t => t.Address).NotNull();
            RuleFor(t => t.PhoneNumber).NotEmpty();
            RuleFor(t => t.TypeOfServiceId).NotNull();
            RuleFor(t => t.RegistrationDate).NotNull();
        }

    }
}
