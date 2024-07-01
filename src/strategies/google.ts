import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    scope: ['email', 'profile','https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.force-ssl'],
},
    async ( 
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
        ) => {
        console.log(accessToken); //acessToken precisa estar encripitado em algum lugar
        console.log(profile)
        done(null, {username: profile.displayName})
    })
);

//AIzaSyDL_4QzXK1_QR2hJ-zYzFCmUKPWm5HZN24

//api key AIzaSyDcaZyEjJSVteal4FLGZH953ooNiK2L-Ic