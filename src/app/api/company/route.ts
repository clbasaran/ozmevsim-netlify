import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/database';

export async function GET() {
  console.log('🔍 Company Info API GET request received');
  try {
    console.log('🔌 Attempting database connection...');
    const client = await dbPool.connect();
    console.log('✅ Database connected successfully');
    
    const result = await client.query(`
      SELECT 
        id, company_name, about_text, mission, vision, values,
        founding_year, team_size, experience_years, certifications,
        address, phone, email, working_hours, social_media,
        hero_title, hero_subtitle, hero_image, logo_url,
        created_at, updated_at
      FROM company_info 
      WHERE is_active = true 
      ORDER BY created_at DESC 
      LIMIT 1
    `);
    
    console.log(`📊 Found company info`);
    client.release();

    const response = NextResponse.json(result.rows[0] || {});
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching company info:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch company info' },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      company_name, about_text, mission, vision, values,
      founding_year, team_size, experience_years, certifications,
      address, phone, email, working_hours, social_media,
      hero_title, hero_subtitle, hero_image, logo_url 
    } = body;

    const client = await dbPool.connect();
    
    // Check if record exists
    const existingResult = await client.query('SELECT id FROM company_info WHERE is_active = true LIMIT 1');
    
    let result;
    if (existingResult.rows.length > 0) {
      // Update existing record
      result = await client.query(
        `UPDATE company_info 
         SET company_name = $1, about_text = $2, mission = $3, vision = $4, values = $5,
             founding_year = $6, team_size = $7, experience_years = $8, certifications = $9,
             address = $10, phone = $11, email = $12, working_hours = $13, social_media = $14,
             hero_title = $15, hero_subtitle = $16, hero_image = $17, logo_url = $18,
             updated_at = NOW()
         WHERE id = $19 
         RETURNING *`,
        [company_name, about_text, mission, vision, JSON.stringify(values || []),
         founding_year, team_size, experience_years, JSON.stringify(certifications || []),
         address, phone, email, working_hours, JSON.stringify(social_media || {}),
         hero_title, hero_subtitle, hero_image, logo_url, existingResult.rows[0].id]
      );
    } else {
      // Insert new record
      result = await client.query(
        `INSERT INTO company_info (company_name, about_text, mission, vision, values, founding_year, team_size, experience_years, certifications, address, phone, email, working_hours, social_media, hero_title, hero_subtitle, hero_image, logo_url, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, true, NOW(), NOW()) 
         RETURNING *`,
        [company_name, about_text, mission, vision, JSON.stringify(values || []),
         founding_year, team_size, experience_years, JSON.stringify(certifications || []),
         address, phone, email, working_hours, JSON.stringify(social_media || {}),
         hero_title, hero_subtitle, hero_image, logo_url]
      );
    }
    
    client.release();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating company info:', error);
    return NextResponse.json(
      { error: 'Failed to update company info' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
} 