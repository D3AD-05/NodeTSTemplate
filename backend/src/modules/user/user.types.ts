export interface UserData {
  userName: string;
  password: string;
}

export interface User extends UserData {
  id: string;
}
