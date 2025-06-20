import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🧪 Test API endpoint called');
  
  try {
    return NextResponse.json({
      success: true,
      message: 'Test API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error('❌ Test API error:', error);
    return NextResponse.json(
      { success: false, error: 'Test API failed' },
      { status: 500 }
    );
  }
} 