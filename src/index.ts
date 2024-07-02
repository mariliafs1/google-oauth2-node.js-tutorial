
import { config } from 'dotenv';
config();

import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import flash from 'connect-flash';

import authRoutes from './routes/auth';
import homeRoutes from './routes/homeRoutes';

require('./strategies/google');

// Serialização do usuário
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

// Desserialização do usuário
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req: Request, res: Response) => {
      res.redirect('/');
    }
  );

  app.get('/home', (req: Request, res: Response) => {
    res.send(`Hello ${(req.user as { username?: string }).username ?? 'Guest'}`);
  });

  app.use('/api/auth', authRoutes);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname)));
  app.use(express.urlencoded({ extended: true }));

  app.use('/', homeRoutes);

  try {
    app.listen(PORT, () => console.log(`Server escutando a porta: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

bootstrap();