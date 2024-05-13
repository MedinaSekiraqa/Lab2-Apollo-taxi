//const payload = jwt.decode(token)as JwtPayload | null

import jwt, { JwtPayload } from "jsonwebtoken";

// utils/token.ts
export function isTokenExpired(token: string): boolean {
   try {
      const decodedToken = jwt.decode(token) as JwtPayload | null;

      if (!decodedToken || !decodedToken.exp) {
         return true;
      }

      const expiry = decodedToken.exp;

      // Check if the current time is greater than or equal to the expiry time
      return Date.now() >= expiry * 1000;
   } catch (error) {
      console.error("Error while decoding token:", error);
      return true;
   }
}