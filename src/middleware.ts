import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks/clerk', // Contoh webhook, sesuaikan jika perlu
    '/firebase-messaging-sw.js', // Sangat penting!
]);

export default clerkMiddleware(async (auth, req) => {
    // if (isProtectedRoute(req)) {
    //     await auth.protect(); // Protect routes that match the pattern
    // }

    if (!isPublicRoute(req)) {
        auth.protect();
    }
});

export const config = {
    matcher: [
        // // Skip Next.js internals and all static files, unless found in search params
        // '/((?!_next|firebase-messaging-sw\\.js|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // // Always run for API routes
        // '/(api|trpc)(.*)',

        '/((?!_next/image|_next/static|favicon.ico).*)',
        '/',
    ],
};
