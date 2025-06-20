import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const client = await dbPool.connect();
    const result = await client.query(
      'SELECT * FROM services WHERE id = $1 AND is_active = true',
      [params.id]
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
    const body = await request.json();
    const { title, description, short_description, image_url, icon, features, price_min, price_max, is_featured, is_active } = body;

    const client = await dbPool.connect();
    const result = await client.query(
      `UPDATE services 
       SET title = $1, description = $2, short_description = $3, image_url = $4, 
           icon = $5, features = $6, price_min = $7, price_max = $8, is_featured = $9, 
           is_active = $10, updated_at = NOW()
       WHERE id = $11 
       RETURNING *`,
      [title, description, short_description, image_url, icon, 
       JSON.stringify(features || []), price_min, price_max, is_featured, is_active, params.id]
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
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const client = await dbPool.connect();
    const result = await client.query(
      'UPDATE services SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [params.id]
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