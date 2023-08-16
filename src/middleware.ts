import exp from "constants";
import { NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://www.yoursite.com', 'https://yoursite.com'] : ['http://localhost:3000', 'https://www.google.com']
export function middleware(request: Request) {
    // // to limit only path that interest us one can use three ways 
    // // 1st approach is using regex to filter the paths 
    // const regex = new RegExp('/api/*');

    // if(regex.test(request.url)) {

    // }
    // // 2nd approach is to use includes the paths using the following function - it fileters out
    // if(request.url.includes('/api')) {

    // }
    const origin = request.headers.get('origin')
    console.log(origin)

    if(origin && !allowedOrigins.includes(origin)){
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type' : 'text/plain'
            }
        })
    }
    console.log('Middleware')

    console.log(request.method)
    console.log(request.url)

    

    return NextResponse.next()
}
// middleware is applied to only the following paths
// 3 approach is to define a config file to match the paths needed 
export const config = {
    matcher: '/api/:path*'
}