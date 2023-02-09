import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const session = await getToken({ req, secret, raw: true });

      return !!session;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
