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
      'SELECT * FROM faq WHERE id = $1 AND is_active = true',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching FAQ:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch FAQ' },
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
    const { question, answer, category, sort_order, is_active } = body;

    const client = await dbPool.connect();
    const result = await client.query(
      `UPDATE faq 
       SET question = COALESCE($1, question), answer = COALESCE($2, answer), 
           category = COALESCE($3, category), sort_order = COALESCE($4, sort_order), 
           is_active = COALESCE($5, is_active), updated_at = NOW()
       WHERE id = $6 
       RETURNING *`,
      [question, answer, category, sort_order, is_active, id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    console.log('✅ FAQ updated successfully:', result.rows[0].id);
    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error updating FAQ:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update FAQ', details: error instanceof Error ? error.message : 'Unknown error' },
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
    
    // Soft delete - set is_active to false
    const result = await client.query(
      'UPDATE faq SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    console.log('✅ FAQ deleted successfully:', id);
    const response = NextResponse.json({ message: 'FAQ deleted successfully' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error deleting FAQ:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete FAQ', details: error instanceof Error ? error.message : 'Unknown error' },
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