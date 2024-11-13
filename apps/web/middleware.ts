import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env} from "~/env";
export function middleware(request: NextRequest) {
  const {pathname} = new URL(request.url)
    console.log('--- url.pathname',env.AUTH);

    if(env.AUTH && pathname.startsWith('/hf/')){
      if (pathname.startsWith('/hf/login')) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/hf/login', request.url))
    }
    return NextResponse.next()
}
