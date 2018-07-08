using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;

namespace Shop.Services
{
    public interface IProductService
    {
        List<Product> FindAll();
        Product FindOne(int Id);
        Product Save(Product product);
        Product Update(Product Product, int productId, int customerId, int storeId, DateTime dateSold);
        void Delete(int id);
    }
}