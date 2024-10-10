import {  NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token')?.value || '';

    console.log(token);


    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};