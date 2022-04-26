export interface IButton {
  name: string;
  label: string;
}

interface IUserAbstract {
  id: number;
  name: string;
}
export interface IUserCard extends IUserAbstract {
  address: IReducedAddress;
  company: ICompany;
}
export interface IUser extends IUserAbstract {
  username: string;
  email: string;
  address: IFullAddress;
  phone: string;
  website: string;
}

export interface IUserWithMessage extends IUser {
  text: string;
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
