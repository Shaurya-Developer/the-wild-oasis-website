// [...nextauth] means catch all segments, means catch all endpoints which start with /api/auth/whatever we want will be handled by this

export { GET, POST } from "@/app/_lib/auth";

// importing and exporting GET, POST at same time, we have ti export GET, POST HTTP actions in order to use them but they are in different folder so we also have to import them firstly so we are importing and exporting at same time

// Next js will create paths like http://localhost:3000/api/auth/signin, signout automatically
