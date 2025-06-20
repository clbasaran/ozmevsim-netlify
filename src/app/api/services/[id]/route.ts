import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    const result = await client.query(
      'SELECT * FROM services WHERE id = $1 AND is_active = true',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, short_description, image_url, icon, features, benefits, price_min, price_max, duration, warranty, is_featured, is_active } = body;

    const client = await dbPool.connect();
    const result = await client.query(
      `UPDATE services 
       SET title = $1, description = $2, short_description = $3, image_url = $4, 
           icon = $5, features = $6, benefits = $7, price_min = $8, price_max = $9, 
           duration = $10, warranty = $11, is_featured = $12, is_active = $13, updated_at = NOW()
       WHERE id = $14 
       RETURNING *`,
      [title, description, short_description, image_url, icon, 
       JSON.stringify(features || []), JSON.stringify(benefits || []), price_min, price_max, 
       duration, warranty, is_featured, is_active, id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error updating service:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update service', details: error instanceof Error ? error.message : 'Unknown error' },
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
    const result = await client.query(
      'UPDATE services SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
} 