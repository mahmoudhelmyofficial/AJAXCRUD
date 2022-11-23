using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CRUDWithAJAX.Models;

namespace CRUDWithAJAX.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<CRUDWithAJAX.Models.Student> Student { get; set; }
        public DbSet<CRUDWithAJAX.Models.Employer> Employer { get; set; }
        public DbSet<CRUDWithAJAX.Models.Men> Men { get; set; }
    }
}