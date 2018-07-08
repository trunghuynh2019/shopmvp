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
            List<Store> stores = new List<Store>()
            {
                new Store() { Name = "store1", Address = "addresss1"},
                new Store() { Name = "store2", Address = "addresss2"},
            };

            List<Customer> customers = new List<Customer>()
            {
                new Customer() { Name = "customer2", Address = "addresss1"},
                new Customer() { Name = "customer2", Address = "addresss2"},
            };

            List<Product> products = new List<Product>()
            {
                new Product() { Name = "customer2", Price = 100},
                new Product() { Name = "customer2", Price = 300},
            };

            foreach (var customer in customers)
            {
                context.Customers.Add(customer);
            }

            foreach (var store in stores)
            {
                context.Stores.Add(store);
            }

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
            base.Seed(context);

        }
    }
}