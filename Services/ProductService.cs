using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Shop.DAL;
using Shop.Models;

namespace Shop.Services
{
    public class ProductService: IProductService
    {
        private ShopContext shopContext;

        public ProductService(ShopContext _context)
        {
            this.shopContext = _context;
        }

        public List<Product> FindAll()
        {
            return shopContext.Products.ToList();
        }

        public Product FindOne(int Id)
        {
            throw new NotImplementedException();
        }

        public Product Save(Product product)
        {
            try
            {
                shopContext.Products.Add(product);
                shopContext.SaveChanges();
                return product;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = JsonConvert.SerializeObject(errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = fullErrorMessage;

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);

            }
        }

        public Product Update(Product Product, int productId, int customerId, int storeId, DateTime dateSold)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}