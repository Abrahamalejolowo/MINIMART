import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import OrderDetailsClient from '@/app/admin/orders/[id]/_components/order-details-client'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Order {
  id: string
  user_name: string
  user_email: string
  user_phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  country: string
  postal_code: string
  amount: number
  currency: string
  status: string
  items: OrderItem[]
  created_at: string
  flutterwave_tx_id?: string
}

async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('❌ Missing Supabase credentials')
      return null
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    console.log('📥 [SERVER] Fetching order:', orderId)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)

    if (error) {
      console.error('❌ [SERVER] Query error:', error.message)
      return null
    }

    if (!data || data.length === 0) {
      console.error('❌ [SERVER] Order not found:', orderId)
      return null
    }

    console.log('✅ [SERVER] Order found:', orderId)
    return data[0] as Order
  } catch (err: any) {
    console.error('❌ [SERVER] Error:', err.message)
    return null
  }
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: orderId } = await params

  console.log('📄 [PAGE] Rendering order details for:', orderId)

  const order = await getOrder(orderId)

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Link
          href="/admin"
          className="mb-6 flex items-center gap-2 text-[#49732C] hover:text-green-700 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-red-800">Order Not Found</h2>
              <p className="text-red-700 mt-2">
                Could not find order with ID: {orderId}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <OrderDetailsClient order={order} />
}