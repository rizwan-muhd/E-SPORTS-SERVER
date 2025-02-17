import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.Model";
import { sendEmail } from '../utils/Email.Service'
import { templateText } from '../utils/Email.template'
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Load environment variables from .env file
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User Not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid Credentials')
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return { accessToken, refreshToken, user }
}


if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secret keys are not defined in environment variables.");
}

export const generateAccessToken = (user: { id: string; role: string }) => {
  return jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"], // Explicit type casting
  });
};

export const generateRefreshToken = (user: { id: string; role: string }) => {
  return jwt.sign({ id: user.id, role: user.role }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
  });
};

export const sendResetPasswordEmail = async (to: string) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/}`;
  const text = templateText(resetPasswordUrl)
  await sendEmail(to, subject, text);
};


// export const generateResetPasswordToken = async (email: string) => {
//   const user = await User.findOne({ where: { email } });
//   if (!user) {
//     throw new Error('User Not found')
//   }
//   const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//   const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
//   await saveToken({ token: resetPasswordToken, userId: user.id, expires, type: tokenTypes.RESET_PASSWORD });
//   console.log(resetPasswordToken);
//   return resetPasswordToken;
// };


export const googleAuth = () => {

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/auth/google/callback",// Make sure it matches your route
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        console.log("Google Profile:", profile);

        const user: any = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0].value,
          picture: profile.photos?.[0].value,
        };
        const newUser = await User.create({ name: user.displayName, email: user.email });

        // Normally, you would save the user in the database here
        return done(null, user);
      }
    )
  );

  // ✅ Serialize user to session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // ✅ Deserialize user from session
  passport.deserializeUser((user, done) => {
    done(null, user as any);
  });
};


