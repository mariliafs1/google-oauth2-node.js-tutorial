import { Profile } from 'passport-google-oauth20';

declare global {
  namespace Express {
    interface User {
      username: string;
      email: string;
      googleId: string;
      accessToken: string;
    }
  }
}

export{User}