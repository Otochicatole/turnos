import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const user = await res.json();
    console.log("Usuario autenticado:", user);

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
