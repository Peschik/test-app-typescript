export interface IButton {
  name: string;
  label: string;
}
export interface IUserCard {
  id: number;
  name: string;
  city: string;
  company: string;
}
export interface IUser extends IUserCard {
  username: string;
  email: string;
  street: string;
  zipcode: string;
  phone: string;
  website: string;
}
