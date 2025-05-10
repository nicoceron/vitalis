'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { products, getSubscriptionPrice } from '@/lib/mock-data';
import type { ProductId } from '@/lib/types';
import {
  CalendarIcon,
  CheckCircle2,
  PauseCircle,
  RefreshCw,
} from 'lucide-react';

export default function SubscriptionsPage() {
  const { user, isLoading, subscriptions } = useAuth();
  const router = useRouter();
  const [selectedFrequency, setSelectedFrequency] = useState<
    'monthly' | 'annual'
  >('monthly');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className='flex flex-col min-h-screen'>
        <SiteHeader />
        <main className='flex-1 flex items-center justify-center'>
          <p>Loading...</p>
        </main>
      </div>
    );
  }
  function formatTitle(value?: string) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '—';
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className='h-5 w-5 text-emerald-500' />;
      case 'paused':
        return <PauseCircle className='h-5 w-5 text-amber-500' />;
      case 'canceled':
        return <RefreshCw className='h-5 w-5 text-gray-500' />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'paused':
        return 'bg-amber-100 text-amber-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <SiteHeader />
      <main className='flex-1 bg-gray-50 py-12'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>My Subscriptions</h1>
              <p className='text-gray-600 mt-1'>
                Manage your Vitalis subscriptions
              </p>
            </div>
            <Button
              className='bg-emerald-700 hover:bg-emerald-800'
              onClick={() => router.push('/account/subscriptions/new')}
            >
              Add New Subscription
            </Button>
          </div>

          {subscriptions.length > 0 ? (
            <div className='space-y-8'>
              <div>
                <h2 className='text-xl font-semibold mb-4'>
                  Active Subscriptions
                </h2>
                <div className='grid gap-6 md:grid-cols-2'>
                  {subscriptions.map((subscription) => (
                    <Card key={subscription.id}>
                      <CardHeader className='pb-3'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <CardTitle>
                              {products[subscription.productId].name}
                            </CardTitle>
                            <CardDescription className='mt-1'>
                              {products[subscription.productId].description}
                            </CardDescription>
                          </div>
                          <Badge
                            className={getStatusColor(subscription.status)}
                            variant='secondary'
                          >
                            <span className='flex items-center gap-1'>
                              {getStatusIcon(subscription.status)}
                              {subscription.status.charAt(0).toUpperCase() +
                                subscription.status.slice(1)}
                            </span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className='flex items-center gap-4 mb-4'>
                          <div className='w-16 h-16 relative shrink-0 rounded overflow-hidden'>
                            <Image
                              src={
                                products[subscription.productId].image ||
                                '/placeholder.svg'
                              }
                              alt={products[subscription.productId].name}
                              fill
                              className='object-cover'
                            />
                          </div>
                          <div>
                            <div className='text-sm text-gray-500'>
                              Subscription Plan
                            </div>
                            <div className='font-medium'>
                              {subscription.frequency.charAt(0).toUpperCase() +
                                subscription.frequency.slice(1)}
                            </div>
                          </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                          <div>
                            <div className='text-gray-500'>
                              Next billing date
                            </div>
                            <div className='font-medium flex items-center gap-1 mt-1'>
                              <CalendarIcon className='h-4 w-4 text-emerald-700' />
                              {formatDate(subscription.nextBillingDate)}
                            </div>
                          </div>
                          <div>
                            <div className='text-gray-500'>Price</div>
                            <div className='font-medium mt-1'>
                              ${subscription.price.toFixed(2)}
                              {subscription.frequency === 'annual'
                                ? '/year'
                                : '/month'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className='flex justify-between pt-3'>
                        <Button variant='outline'>Manage</Button>
                        <Button
                          variant='outline'
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className='border-t pt-8'>
                <h2 className='text-xl font-semibold mb-4'>
                  Subscription History
                </h2>
                <div className='bg-white rounded-lg shadow overflow-hidden'>
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
                          Plan
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Started
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {subscriptions.map((subscription) => (
                        <tr key={`history-${subscription.id}`}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='flex-shrink-0 h-10 w-10 relative'>
                                <Image
                                  src={
                                    products[subscription.productId].image ||
                                    '/placeholder.svg'
                                  }
                                  alt={products[subscription.productId].name}
                                  fill
                                  className='rounded-full object-cover'
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {products[subscription.productId].name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-900'>
                              {subscription.frequency.charAt(0).toUpperCase() +
                                subscription.frequency.slice(1)}
                            </div>
                            <div className='text-sm text-gray-500'>
                              ${subscription.price.toFixed(2)}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-900'>
                              {formatDate(subscription.createdAt)}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <Badge
                              className={getStatusColor(subscription.status)}
                              variant='secondary'
                            >
                              <span className='flex items-center gap-1'>
                                {getStatusIcon(subscription.status)}
                                {subscription.status.charAt(0).toUpperCase() +
                                  subscription.status.slice(1)}
                              </span>
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-white rounded-lg shadow-sm p-8 text-center'>
              <div className='mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4'>
                <CalendarIcon className='h-8 w-8 text-emerald-700' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>
                No Active Subscriptions
              </h3>
              <p className='text-gray-600 mb-6 max-w-md mx-auto'>
                You don't have any active subscriptions yet. Subscribe to
                Vitalis products for regular delivery and save.
              </p>
              <Button
                className='bg-emerald-700 hover:bg-emerald-800'
                onClick={() => router.push('/account/subscriptions/new')}
              >
                Browse Subscription Plans
              </Button>
            </div>
          )}

          <div className='mt-16'>
            <h2 className='text-2xl font-bold mb-6'>
              Available Subscription Plans
            </h2>
            <Tabs
              value={selectedFrequency}
              onValueChange={(v) =>
                setSelectedFrequency(v as 'monthly' | 'annual')
              }
            >
              <div className='flex justify-between items-center mb-6'>
                <TabsList>
                  <TabsTrigger value='monthly'>Monthly</TabsTrigger>
                  <TabsTrigger value='annual'>Annual (Save 20%)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='monthly' className='space-y-6'>
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  {Object.values(products).map((product) => (
                    <Card
                      key={`monthly-${product.id}`}
                      className='overflow-hidden'
                    >
                      <div className='aspect-square relative'>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold text-emerald-700'>
                          ${product.price.toFixed(2)}/month
                        </div>
                        <p className='text-sm text-gray-500 mt-1'>
                          Billed monthly
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className='w-full bg-emerald-700 hover:bg-emerald-800'>
                          Subscribe
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='annual' className='space-y-6'>
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  {Object.values(products).map((product) => {
                    const annualPrice = getSubscriptionPrice(
                      product.id as ProductId,
                      'annual'
                    );
                    const monthlyEquivalent = (annualPrice / 12).toFixed(2);

                    return (
                      <Card
                        key={`annual-${product.id}`}
                        className='overflow-hidden'
                      >
                        <div className='aspect-square relative'>
                          <Image
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{product.name}</CardTitle>
                          <CardDescription>
                            {product.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='text-2xl font-bold text-emerald-700'>
                            ${annualPrice.toFixed(2)}/year
                          </div>
                          <p className='text-sm text-gray-500 mt-1'>
                            ${monthlyEquivalent}/month billed annually
                          </p>
                          <div className='mt-2 inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded'>
                            Save 20%
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className='w-full bg-emerald-700 hover:bg-emerald-800'>
                            Subscribe
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className='border-t py-6 md:py-8 bg-white'>
        <div className='container flex flex-col gap-4 px-4 md:px-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-bold text-emerald-700'>
                Vitalis
              </span>
              <span className='text-xs align-top'>®</span>
            </div>
            <nav className='flex gap-4 sm:gap-6'>
              <Link
                href='#'
                className='text-xs hover:underline underline-offset-4'
              >
                Terms
              </Link>
              <Link
                href='#'
                className='text-xs hover:underline underline-offset-4'
              >
                Privacy
              </Link>
              <Link
                href='#'
                className='text-xs hover:underline underline-offset-4'
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className='text-xs text-gray-500'>
            © {new Date().getFullYear()} Vitalis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
