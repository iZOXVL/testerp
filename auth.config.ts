import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/../../schemas"
import { getUserByEmail } from "@/../../data/users"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitch from "next-auth/providers/twitch";
import Twitter from "next-auth/providers/twitter";
import Reddit from "next-auth/providers/reddit";
import Spotify from "next-auth/providers/spotify";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import AzureADProvider from "next-auth/providers/azure-ad"

export default {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    Twitch({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    Reddit({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials){
        const validateFields = LoginSchema.safeParse(credentials);
        if(validateFields.success){
          const {email, password} = validateFields.data;

          const user = await getUserByEmail(email);
          
          if(!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );

          if(passwordsMatch) return user;

        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig