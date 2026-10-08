interface AuthenticatedUser {
  username: string;
  token: string;
}

interface User {
  username: string;
  password: string;
}

type MaybeAuthenticatedUser = AuthenticatedUser | undefined;

interface Context {
    authenticatedUser: MaybeAuthenticatedUser;
    loginUser:(user:User)=>Promise<void>;
    registerUser?:(user:User)=>Promise<void>;
    clearUser:()=>void;
}

export type {
    AuthenticatedUser,
    MaybeAuthenticatedUser,
    User,
    Context,
}
