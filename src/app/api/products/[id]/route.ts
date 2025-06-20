import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await dbPool.connect();
    const result = await client.query(
      `SELECT 
        p.id, p.name, p.description, p.short_description, 
        p.main_image as image_url, p.brand, p.category_id, 
        p.features, p.specifications, p.is_active as status, 
        p.created_at, p.updated_at, p.price, p.stock_status,
        c.name as category
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [params.id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, description, short_description, main_image, brand, category_id, features, specifications, price, is_active } = body;

    const client = await dbPool.connect();
    
    // Generate slug from name if name is provided
    let updateQuery = `UPDATE products SET `;
    let values = [];
    let paramCount = 1;
    let updates = [];

    if (name) {
      const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      updates.push(`name = $${paramCount}, slug = $${paramCount + 1}`);
      values.push(name, slug);
      paramCount += 2;
    }
    
    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    
    if (short_description !== undefined) {
      updates.push(`short_description = $${paramCount}`);
      values.push(short_description);
      paramCount++;
    }
    
    if (main_image !== undefined) {
      updates.push(`main_image = $${paramCount}`);
      values.push(main_image);
      paramCount++;
    }
    
    if (brand !== undefined) {
      updates.push(`brand = $${paramCount}`);
      values.push(brand);
      paramCount++;
    }
    
    if (category_id !== undefined) {
      updates.push(`category_id = $${paramCount}`);
      values.push(category_id);
      paramCount++;
    }
    
    if (features !== undefined) {
      updates.push(`features = $${paramCount}`);
      values.push(JSON.stringify(features));
      paramCount++;
    }
    
    if (specifications !== undefined) {
      updates.push(`specifications = $${paramCount}`);
      values.push(JSON.stringify(specifications));
      paramCount++;
    }
    
    if (price !== undefined) {
      updates.push(`price = $${paramCount}`);
      values.push(price);
      paramCount++;
    }
    
    if (is_active !== undefined) {
      updates.push(`is_active = $${paramCount}`);
      values.push(is_active);
      paramCount++;
    }
    
    updates.push(`updated_at = NOW()`);
    updateQuery += updates.join(', ') + ` WHERE id = $${paramCount} RETURNING *`;
    values.push(params.id);

    const result = await client.query(updateQuery, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await dbPool.connect();
    const result = await client.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [params.id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 