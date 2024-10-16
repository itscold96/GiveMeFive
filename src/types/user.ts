export interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
}

export interface UserStore {
  user: User | null;
  setUser: (newUser: User) => void;
  updateProfileImageUrl: (url: string) => void;
  logout: () => void;
}
