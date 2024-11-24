import NextAuth from "next-auth"
import Auth0 from "next-auth/providers/auth0"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Auth0({
        authorization: {
            params: {
                audience: process.env.AUTH_AUTH0_AUDIENCE
            }
        }
    })],
    basePath: '/api/auth',
    debug: true,
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/logout'
    },
    callbacks: {
        jwt({ token, account, profile }) {
            if (account && profile) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    // groups: profile['cognito:groups'],
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string | undefined;
            // session.groups = token.groups;
            return session;
        },
    },
})

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        // groups?: any;
    }
}