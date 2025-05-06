'use client';

import { useEffect, useState } from 'react';
import { getRecentSubscriptions } from '@/api/adminDashboard';
import {
  CreditCard,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Check,
  Clock,
  X,
} from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await getRecentSubscriptions(50);
      setSubscriptions(data || []);
    };

    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter(
    (s) =>
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.user_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return (
          <div className='text-green-500'>
            <Check size={16} />
          </div>
        );
      case 'pending':
        return (
          <div className='text-yellow-500'>
            <Clock size={16} />
          </div>
        );
      case 'cancelled':
        return (
          <div className='text-red-500'>
            <X size={16} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center'>
            <div className='mr-3 text-emerald-700'>
              <CreditCard size={24} />
            </div>
            Subscriptions
          </h1>
          <button className='bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded'>
            Export Subscriptions
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
                placeholder='Search subscriptions by ID, name or email...'
                className='pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-600'
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className='flex space-x-2'>
              <div className='relative'>
                <button className='flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'>
                  <div className='mr-2'>
                    <Filter size={16} />
                  </div>
                  Status
                  <div className='ml-2'>
                    <ChevronDown size={16} />
                  </div>
                </button>
              </div>
              <div className='flex items-center px-4 py-2 border rounded-md text-gray-700'>
                <div className='mr-2'>
                  <ArrowUpDown size={16} />
                </div>
                Sort by
                <select className='ml-2 focus:outline-none bg-transparent'>
                  <option value='newest'>Newest</option>
                  <option value='oldest'>Oldest</option>
                </select>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Start Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    End Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Plan Type
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {sub.id}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {sub.user_name || '—'}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {sub.user_email || '—'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(sub.start_date).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(sub.end_date).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {sub.plan_type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        {getStatusIcon(sub.status)}
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sub.status.toLowerCase() === 'active'
                              ? 'bg-green-100 text-green-800'
                              : sub.status.toLowerCase() === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button className='text-emerald-600 hover:text-emerald-900'>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex justify-between items-center mt-6'>
            <div className='text-sm text-gray-500'>
              Showing{' '}
              <span className='font-medium'>
                {filteredSubscriptions.length}
              </span>{' '}
              of <span className='font-medium'>{subscriptions.length}</span>{' '}
              subscriptions
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
