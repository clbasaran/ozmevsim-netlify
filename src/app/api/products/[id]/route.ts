import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    
    const result = await client.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = $1 AND p.is_active = true
    `, [id]);
    
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      description,
      short_description,
      category_id,
      brand,
      model,
      price,
      main_image,
      gallery,
      specifications,
      features,
      energy_class,
      is_featured,
      is_active,
      stock_status,
      meta_title,
      meta_description
    } = body;

    // Generate slug if name is provided
    const slug = name ? name.toLowerCase()
      .trim()
      .replace(/[çÇ]/g, 'c')
      .replace(/[ğĞ]/g, 'g')
      .replace(/[ıI]/g, 'i')
      .replace(/[öÖ]/g, 'o')
      .replace(/[şŞ]/g, 's')
      .replace(/[üÜ]/g, 'u')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'product-' + Date.now() : undefined;

    const client = await dbPool.connect();
    const result = await client.query(`
      UPDATE products 
      SET 
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        short_description = COALESCE($4, short_description),
        category_id = COALESCE($5, category_id),
        brand = COALESCE($6, brand),
        model = COALESCE($7, model),
        price = COALESCE($8, price),
        main_image = COALESCE($9, main_image),
        gallery = COALESCE($10, gallery),
        specifications = COALESCE($11, specifications),
        features = COALESCE($12, features),
        energy_class = COALESCE($13, energy_class),
        is_featured = COALESCE($14, is_featured),
        is_active = COALESCE($15, is_active),
        stock_status = COALESCE($16, stock_status),
        meta_title = COALESCE($17, meta_title),
        meta_description = COALESCE($18, meta_description),
        updated_at = NOW()
      WHERE id = $19 
      RETURNING *
    `, [
      name, slug, description, short_description, category_id, brand, model, price,
      main_image, JSON.stringify(gallery || []), JSON.stringify(specifications || {}),
      JSON.stringify(features || []), energy_class, is_featured, is_active,
      stock_status, meta_title, meta_description, id
    ]);
    
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error updating product:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const client = await dbPool.connect();
    
    // Soft delete - set is_active to false instead of hard delete
    const result = await client.query(
      'UPDATE products SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ message: 'Product deleted successfully' });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
} 