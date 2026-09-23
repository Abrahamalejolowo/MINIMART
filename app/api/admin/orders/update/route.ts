import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json()

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Missing orderId or status' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    console.log('🔄 Updating order:', orderId, 'to status:', status)

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()

    if (error) {
      console.error('❌ Error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    console.log('✅ Order updated:', orderId)
    return NextResponse.json({ success: true, order: data[0] })
  } catch (err: any) {
    console.error('❌ Error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}