export type OAuthProvider = 'google' | 'kakao';

export interface OauthSigninParams {
  provider: OAuthProvider;
  code: string | null;
}

export interface OauthSignupParams extends OauthSigninParams {
  nickname: string;
}
