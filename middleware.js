/*

import { NextResponse } from "next/server";

// to use a middleware in nextjs we have to create middleware.js file in the root app, not inside app or anything, and the function here should be called as middleware
export function middleware(request) {
  return NextResponse.redirect(new URL("/about", request.url)); // it will redirect us to the url
}

export const config = {
  matcher: ["/account", "/cabins"], // giving routes where our middleware should run else it will run on all the routes, it will automatically do this, we dont have to use this config anywhere
};

*/

// middleware from the auth.js
const { auth } = require("./app/_lib/auth");
export const middleware = auth; // auth serves as a middleware function
export const config = {
  matcher: ["/account"],
};
