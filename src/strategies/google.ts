
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';

let accessToken: string | null = null;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_REDIRECT_URL,
  scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.force-ssl'],
},
  async (token: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const userProfile = {
      username: profile.displayName,
      email: profile.emails ? profile.emails[0].value : '',
      googleId: profile.id,
      accessToken: token
    };
    console.log(accessToken);
    done(null, userProfile);
  }
));

//AIzaSyDL_4QzXK1_QR2hJ-zYzFCmUKPWm5HZN24

//api key AIzaSyDcaZyEjJSVteal4FLGZH953ooNiK2L-Ic

// {
//     id: '111827847086356829635',
//     displayName: 'PumpkinLyla',
//     name: { familyName: undefined, givenName: 'PumpkinLyla' },
//     emails: [ { value: 'pumpkinlytattoo@gmail.com', verified: true } ],
//     photos: [
//       {
//         value: 'https://lh3.googleusercontent.com/a/ACg8ocJR7kurH0rtTsgzScYh6wXLOKAIrzT9A0uci-CXMRlPPW0VbVXy=s96-c'
//       }
//     ],
//     provider: 'google',
//     _raw: '{\n' +
//       '  "sub": "111827847086356829635",\n' +
//       '  "name": "PumpkinLyla",\n' +
//       '  "given_name": "PumpkinLyla",\n' +
//       '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocJR7kurH0rtTsgzScYh6wXLOKAIrzT9A0uci-CXMRlPPW0VbVXy\\u003ds96-c",\n' +
//       '  "email": "pumpkinlytattoo@gmail.com",\n' +
//       '  "email_verified": true\n' +
//       '}',
//     _json: {
//       sub: '111827847086356829635',
//       name: 'PumpkinLyla',
//       given_name: 'PumpkinLyla',
//       picture: 'https://lh3.googleusercontent.com/a/ACg8ocJR7kurH0rtTsgzScYh6wXLOKAIrzT9A0uci-CXMRlPPW0VbVXy=s96-c',
//       email: 'pumpkinlytattoo@gmail.com',
//       email_verified: true
//     }
//   }