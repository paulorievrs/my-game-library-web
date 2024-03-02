import { withAuth } from "next-auth/middleware";
import { authOptions } from "./app/api/auth/config";
export const config = {
  matcher: ["/profile/:path*", "/review/:path*"],
  unstable_allowDynamic: ["/node_modules/@babel/runtime/regenerator/index.js"]
};
export default withAuth({
  pages: authOptions.pages
});
