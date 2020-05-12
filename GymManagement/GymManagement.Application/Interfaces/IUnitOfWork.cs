namespace GymManagement.Application.Interfaces
{
    public interface IUnitOfWork
    {
        IMemberRepository Members { get; }
    }
}
