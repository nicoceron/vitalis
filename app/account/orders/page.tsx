"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/mock-data"
import { Package, ShoppingBag, Truck } from "lucide-react"

export default function OrdersPage() {
  const { user, isLoading, orders } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "shipped":
        return <Badge className="bg-amber-100 text-amber-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-emerald-100 text-emerald-800">Delivered</Badge>
      case "canceled":
        return <Badge className="bg-red-100 text-red-800">Canceled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-gray-600 mt-1">View and track your Vitalis orders</p>
            </div>
            <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                        <CardDescription>Placed on {formatDate(order.date)}</CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-item-${index}`} className="flex items-center gap-4 p-4">
                          <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden">
                            <Image
                              src={products[item.productId].image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${item.price.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-gray-50 border-t p-4">
                    <div className="flex items-center gap-2">
                      {order.status === "delivered" ? (
                        <Package className="h-5 w-5 text-emerald-700" />
                      ) : order.status === "shipped" ? (
                        <Truck className="h-5 w-5 text-amber-700" />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-blue-700" />
                      )}
                      <span className="text-sm">
                        {order.status === "delivered"
                          ? "Delivered"
                          : order.status === "shipped"
                            ? "In Transit"
                            : "Processing"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={() => router.push("/")}>
                Shop Now
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 md:py-8 bg-white">
        <div className="container flex flex-col gap-4 px-4 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-700">Vitalis</span>
              <span className="text-xs align-top">®</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
          <div className="text-xs text-gray-500">© {new Date().getFullYear()} Vitalis. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
