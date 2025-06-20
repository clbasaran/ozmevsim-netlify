import { NextRequest, NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    const result = await client.query(
      'SELECT * FROM contact_messages WHERE id = $1',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching contact message:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch contact message' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes, is_urgent } = body;

    const client = await dbPool.connect();
    const result = await client.query(
      `UPDATE contact_messages 
       SET status = COALESCE($1, status), notes = COALESCE($2, notes), 
           is_urgent = COALESCE($3, is_urgent), updated_at = NOW()
       WHERE id = $4 
       RETURNING *`,
      [status, notes, is_urgent, id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }

    console.log('✅ Contact message updated successfully:', result.rows[0].id);
    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error updating contact message:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update contact message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    
    // Hard delete for contact messages
    const result = await client.query(
      'DELETE FROM contact_messages WHERE id = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }

    console.log('✅ Contact message deleted successfully:', id);
    const response = NextResponse.json({ message: 'Contact message deleted successfully' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error deleting contact message:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete contact message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
} 