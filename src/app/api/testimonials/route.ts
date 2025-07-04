import { NextRequest, NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('🔍 Testimonials API GET request received');

  try {
    console.log('🔌 Attempting database connection...');
    
    const result = await dbPool.query(`
      SELECT 
        id,
        name,
        email,
        company,
        position,
        content,
        rating,
        service_category,
        is_active,
        is_featured,
        is_approved,
        avatar_url,
        created_at,
        updated_at
      FROM testimonials 
      WHERE is_active = true
      ORDER BY is_featured DESC, created_at DESC
    `);
    
    console.log('✅ Database connected successfully');
    console.log(`📊 Found ${result.rows.length} testimonials`);

    return NextResponse.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('❌ Error fetching testimonials:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      company,
      position,
      content,
      rating,
      service_category,
      is_active = true,
      is_featured = false,
      is_approved = true,
      avatar_url
    } = body;

    if (!name || !content || !rating) {
      return NextResponse.json(
        { error: 'Name, content, and rating are required' },
        { status: 400 }
      );
    }

    const result = await dbPool.query(`
      INSERT INTO testimonials (
        name, email, company, position, content, rating, service_category,
        is_active, is_featured, is_approved, avatar_url, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      RETURNING *
    `, [
      name, email, company, position, content, rating, service_category,
      is_active, is_featured, is_approved, avatar_url
    ]);

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('❌ Error creating testimonial:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create testimonial',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 