import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

// const scopes = "user-read-playback-state+user-modify-playback-state+user-read-currently-playing+app-remote-control+streaming+playlist-modify-public+user-read-playback-position+user-top-read+user-read-recently-played+user-library-modify+user-library-read"
const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-modify-public",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
  ].join(",");
const params = {
    scope: scopes
}

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
    //refresh the access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))},
    body: params
        })
    const data = await response.json()
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires:Date.now() + data.expires_in * 1000
    }
}


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),

  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.accessTokenExpires = account.expires_at
          return token
        }
        //if access token has not expired
        if (Date.now() < token.accessTokenExpires * 1000) {
            return token
        }
        //if access token has expired
        return refreshAccessToken(token)

    
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      }
  }




}
export default NextAuth(authOptions)