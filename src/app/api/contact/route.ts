import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, service_interest } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const client = await dbPool.connect();
    const result = await client.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message, service_interest, ip_address, user_agent, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) 
       RETURNING *`,
      [
        name,
        email,
        phone || null,
        subject || null,
        message,
        service_interest || null,
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        request.headers.get('user-agent') || 'unknown'
      ]
    );
    client.release();

    return NextResponse.json(
      { 
        message: 'İletişim formu başarıyla gönderildi',
        id: result.rows[0].id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'İletişim formu gönderilirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await dbPool.connect();
    const result = await client.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 50'
    );
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
} 