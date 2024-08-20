/**
 * Interface for User object.
 * @author Daniel Jönsson, Robert Kullman
 */
export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
  userName: string;
}
