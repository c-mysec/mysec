import { JwtIdentity } from './jwt-identity';
export interface JwtObject {
  "at_hash": string;
  "sub": string;
  "cognito:groups": string[];
  "email_verified": boolean;
  "iss": string;
  "cognito:username": string; // "loginwithamazon_amzn1.account.aeplfvgi54a5waq2eqh5lrmujfxa",
  "aud": string;
  "identities": JwtIdentity[];
  "token_use": string;
  "auth_time": number;
  "name": string;
  "exp": number;
  "iat": number;
  "jti": string;
  "email": string;
}
