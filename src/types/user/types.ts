/**
 * 카카오톡 유저의 object
 */
// export interface UserTypes {
//     id: string;
//     nickname: string;
//     image: string;
//     statusMessage?: string;
// }

export interface UserTypes {
  create_at?: string;
  email: string;
  id: string;
  password_hash: string;
  status_message?: string;
  user_id: number;
  username: string;
  profileurl?: string;
}
