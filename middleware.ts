import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (for development)
// In production, use Redis or external service
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getRateLimitInfo(ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = requestCounts.get(ip);
  
  if (!current || now > current.resetTime) {
    // Reset or create new entry
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  
  if (current.count >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  current.count++;
  return { allowed: true, remaining: limit - current.count };
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            '127.0.0.1';
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Different limits for different endpoints
    let limit = 100; // requests per hour
    let windowMs = 60 * 60 * 1000; // 1 hour
    
    // More restrictive for contact and newsletter
    if (request.nextUrl.pathname === '/api/contact' || 
        request.nextUrl.pathname === '/api/newsletter') {
      limit = 5; // requests per 15 minutes
      windowMs = 15 * 60 * 1000; // 15 minutes
    }
    
    const rateLimit = getRateLimitInfo(ip, limit, windowMs);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          error_tr: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.'
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil((Date.now() + windowMs) / 1000).toString(),
          }
        }
      );
    }
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
  }
  
  // Basic security headers (CSP temporarily disabled for debugging)
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Temporarily disable CSP for debugging
  // const csp = [
  //   "default-src 'self'",
  //   "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  //   "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  //   "font-src 'self' https://fonts.gstatic.com",
  //   "img-src 'self' data: https: blob:",
  //   "media-src 'self' https:",
  //   "connect-src 'self' https://api.ozmevsim.com https://cms.ozmevsim.com",
  //   "form-action 'self'",
  //   "base-uri 'self'",
  //   "object-src 'none'",
  //   "frame-ancestors 'none'",
  //   "upgrade-insecure-requests"
  // ].join('; ');
  // 
  // response.headers.set('Content-Security-Policy', csp);
  
  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: response.headers
      });
    }
  }
  
  // Block common attack patterns (only for sensitive endpoints)
  if (request.nextUrl.pathname.startsWith('/api/contact') || 
      request.nextUrl.pathname.startsWith('/api/newsletter')) {
    const userAgent = request.headers.get('user-agent') || '';
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));
    
    if (isSuspicious && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
      console.warn(`Blocked suspicious request from ${ip}: ${userAgent}`);
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
  }
  
  // Clean up old rate limit entries periodically
  if (Math.random() < 0.01) { // 1% chance
    const now = Date.now();
    const keysToDelete: string[] = [];
    requestCounts.forEach((value, key) => {
      if (now > value.resetTime) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => requestCounts.delete(key));
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 