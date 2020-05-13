using GymManagement.Application.Interfaces;

namespace GymManagement.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(IMemberRepository memberRepository)
        {
            Members = memberRepository;
        }
        public IMemberRepository Members { get; }

    }
}
