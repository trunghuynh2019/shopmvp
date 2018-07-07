using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Shop.DAL
{
    public class ShopContext: DbContext
    {
        public ShopContext() : base("shopContext")
        {
        }

        public virtual DbSet<Store> Stores { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}