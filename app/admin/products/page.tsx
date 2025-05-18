
'use client';

import { useState, useEffect } from 'react';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/api/product';

import { Package, Search, Plus, Filter } from 'lucide-react';
import { Product, ProductId, ProductCategory } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data || []);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const name = prompt('Product name:');
    const price = parseFloat(prompt('Price:') || '0');
    const category = prompt('Category:');
    const stock = parseInt(prompt('Stock:') || '0', 10);
    const isActive = confirm('Is the product active?');

    if (name && category && !isNaN(price)) {
      const id = name.toLowerCase().replace(/\s+/g, '-'); // simple ID

      const newProduct = await createProduct({
        id: id as ProductId,
        name,
        description: '',
        price,
        image: '',
        is_active: isActive,
        category: category as ProductCategory,
        stock,
      });

      if (newProduct) setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const handleEditProduct = async (id: string) => {
    const name = prompt('New name:');
    const price = parseFloat(prompt('New price:') || '0');
    const stock = parseInt(prompt('New stock:') || '0', 10);
    const isActive = confirm('Is active?');

    if (name && !isNaN(price)) {
      const updated = await updateProduct(id as ProductId, {
        name,
        price,
        stock,
        is_active: isActive,
      });

      if (updated) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
        );
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const ok = await deleteProduct(id as ProductId);
      if (ok) setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className='p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center'>
            <div className='mr-3 text-emerald-700'>
              <Package size={24} />
            </div>
            Products
          </h1>
          <button
            onClick={handleAddProduct}
            className='bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded flex items-center'
          >
            <div className='mr-2'>
              <Plus size={16} />
            </div>
            Add Product
          </button>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border mb-8'>
          <div className='flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4'>
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
                <Search size={18} />
              </div>
              <input
                type='text'
                placeholder='Search products...'
                className='pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-600'
              />
            </div>
            <div className='flex space-x-2'>
              <button className='flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'>
                <div className='mr-2'>
                  <Filter size={16} />
                </div>
                Filter
              </button>
              <select className='px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600'>
                <option value='newest'>Name: A-Z</option>
                <option value='oldest'>Name: Z-A</option>
                <option value='price-high'>Price: High to Low</option>
                <option value='price-low'>Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Product
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Stock
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Category
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {products.map((product) => (
                  <tr key={product.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        {product.name}
                      </div>
                      <div className='text-sm text-gray-500'>{product.id}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {product.stock} units
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {product.category}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className='text-emerald-600 hover:text-emerald-900 mr-4'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className='text-red-600 hover:text-red-900'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex justify-between items-center mt-6'>
            <div className='text-sm text-gray-500'>
              Showing <span className='font-medium'>{products.length}</span>{' '}
              products
            </div>
            <div className='flex space-x-2'>
              <button
                className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                disabled
              >
                Previous
              </button>
              <button className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
