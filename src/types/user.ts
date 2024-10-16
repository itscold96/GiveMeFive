export interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
}

export interface UserStore {
  user: User | null;
  action: {
    setUser: (newUser: User) => void;
    updateProfileImageUrl: (url: string) => void;
    resetUser: () => void;
  };
}
