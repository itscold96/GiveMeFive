export interface SignupReturn {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginReturn {
  user: SignupReturn;
  refreshToken: string;
  accessToken: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams extends LoginParams {
  nickname: string;
}

export type OAuthProvider = 'google' | 'kakao';

export interface OauthSigninParams {
  provider: OAuthProvider;
  code: string | null;
}

export interface OauthSignupParams extends OauthSigninParams {
  nickname: string;
}
