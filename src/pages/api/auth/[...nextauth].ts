import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compareSync } from "bcrypt";
import prisma from "@utils/prisma";
import jwt from "jsonwebtoken";
import { getEnv } from "@utils/get-env";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        type: "credentials",
        credentials: {},
        async authorize(credentials) {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          try {
            const user = await prisma.user.findUnique({
              where: {
                email: email,
              },
            });

            // User not found
            if (!user) {
              await prisma.$disconnect();
              throw new Error("No user found with this email !");
            }

            console.log(user);
            //Check hashed password with database password
            const checkPassword = await compareSync(password, user.password);
            console.log(checkPassword);

            // // Password Not Matched
            if (!checkPassword) {
              throw new Error("Password is wrong !");
            }

            // Login Success
            return user;
          } catch (error: any) {
            throw new Error(error.message);
          } finally {
            async () => {
              await prisma.$disconnect();
            };
          }
        },
      }),

      GoogleProvider({
        clientId: getEnv("GOOGLE_CLIENT_ID"),
        clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
      }),
      FacebookProvider({
        clientId: getEnv("FACEBOOK_CLIENT_ID"),
        clientSecret: getEnv("FACEBOOK_CLIENT_SECRET"),
      }),
    ],

    adapter: PrismaAdapter(prisma),
    secret: getEnv("SECRET"),
    session: {
      strategy: "jwt",
      // strategy: 'database',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    jwt: {
      secret: getEnv("SECRET"),
      // Set to true to use encryption (default: false)
      // encryption: true,

      encode: async ({ secret, token, maxAge }) => {
        const jwtClaims = {
          state: token.state,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          iat: Date.now() / 1000,
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        };
        const encodedToken = jwt.sign(jwtClaims, secret, {
          algorithm: "HS256",
        });
        return encodedToken;
      },
      decode: async ({ secret, token }) => {
        const decodedToken = jwt.verify(token, secret, { algorithms: "HS256" });
        return decodedToken;
      },

      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },

    pages: {
      // signIn: "/auth/signin", // Displays signin buttonsc
      // error: "/auth/signin",
      // signOut: '/auth/signout', // Displays form with sign out button
      // verifyRequest: "/auth/signin-verify", // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   return true;
      // },
      // async redirect({ url, baseUrl }) {
      //   return url.startsWith(baseUrl)
      //     ? Promise.resolve(url)
      //     : Promise.resolve(baseUrl);
      // },

      async session({ session, user, token }) {
        const encodedToken = jwt.sign(token, getEnv("SECRET"), {
          algorithm: "HS256",
        });
        session.user.id = token.id;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = encodedToken;

        return Promise.resolve(session);
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        const isUserSignedIn = user ? true : false;
        // make a http call to our  api
        // store this in postgres
        if (isUserSignedIn) {
          token.id = user.id;
          token.image = user.image ? user.image.toString() : null;
          token.name = user.name ? user.name.toString() : "";
          token.email = user.email ? user.email.toString() : "";
        }
        return Promise.resolve(token);
      },
    },

    events: {},
    debug: getEnv("NODE_ENV") === "development",
  });
