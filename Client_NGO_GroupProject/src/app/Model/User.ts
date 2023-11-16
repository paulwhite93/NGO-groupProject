import { UserRole } from "./UserRole";

export interface User{
  id: number,

  name: string,

  password: string,

  email: string,

  user_role: UserRole,

}