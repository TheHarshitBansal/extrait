import {clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard/(.*)', '/summary/(.*)', '/upload/(.*)']);


export default clerkMiddleware(async (auth, req) => {
  try{
      if(isProtectedRoute(req)) await auth.protect()
    } catch (error) {
      console.error('Error during authentication:', error);
      return new Response('Authentication failed', { status: 401 });
    }
});

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
  
// };