/*
 * Interface to store the user data
 *
 */
export interface UserData {
  id: string;
  username: string;
  href: string;
  uri: string;
  email: string;
  display_name: string;
  image: string;
  likes: string[];
  token: string;
}