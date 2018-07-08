﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Shop.DAL;
using Shop.Models;

namespace Shop.Services
{
    public class CustomerService: ICustomerService
    {
        private ShopContext shopContext;

        public CustomerService(ShopContext _context)
        {
            this.shopContext = _context;
        }

        public List<Customer> FindAll()
        {
            return shopContext.Customers.ToList();
        }

        public Customer FindOne(int Id)
        {
            throw new NotImplementedException();
        }

        public Customer Save(Customer customer)
        {
            try
            {
                shopContext.Customers.Add(customer);
                shopContext.SaveChanges();
                return customer;
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

        public Customer Update(Customer customer, string name, string address)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}