/* istanbul ignore file */
import jwt, { SignOptions, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import config from "config";

export function signToken(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, config.get('accessTokenPrivateKey'), {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, config.get('accessTokenPublicKey'))
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt token is expired",
      decoded: null,
    }
  }
}