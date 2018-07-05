using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;

namespace Shop.DAL
{
    public class ShopInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ShopContext>
    {
        protected override void Seed(ShopContext context)
        {
            var stores = new List<Store>
            {
                Store.FromNameAndAddress("Paris", "134 Willis Street, Te Aro"),
                Store.FromNameAndAddress("NewYork", "134 Kelburn Street, Kelburn")
            };
            stores.ForEach(s => context.Stores.Add(s));
            context.SaveChanges();
        }
    }
}