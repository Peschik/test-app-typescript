export interface IButton {
  name: string;
  label: string;
}
export interface IUserCard {
  id: number;
  name: string;
  address: IReducedAddress;
  company: ICompany;
}
export interface IUser extends IUserCard {
  username: string;
  email: string;
  address: IFullAddress;
  phone: string;
  website: string;
}
export interface IReducedAddress {
  city: string;
}
export interface IFullAddress extends IReducedAddress {
  street: string;
  zipcode: string;
}
export interface ICompany {
  name: string;
}
