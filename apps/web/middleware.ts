import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const {pathname} = new URL(request.url)
    console.log('--- url.pathname',pathname);
    
    if(pathname.startsWith('/hf/')){
      if (pathname.startsWith('/hf/login')) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/hf/login', request.url))
    }
    return NextResponse.next()
}
