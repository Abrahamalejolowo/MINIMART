import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log('📥 Admin login request received')

    const { password } = await req.json()

    // Check password against environment variable
    const correctPassword = process.env.ADMIN_PASSWORD

    if (!correctPassword) {
      console.error('❌ ADMIN_PASSWORD not set in .env.local')
      return NextResponse.json(
        { success: false, error: 'Server not configured' },
        { status: 500 }
      )
    }

    console.log('🔑 Checking password...')

    if (password === correctPassword) {
      console.log('✅ Password correct! Admin logged in')
      return NextResponse.json({ success: true })
    } else {
      console.log('❌ Password incorrect')
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (err) {
    console.error('❌ Login error:', err)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}