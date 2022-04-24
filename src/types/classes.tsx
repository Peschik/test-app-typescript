import {
  IUserCard,
  IReducedAddress,
  IFullAddress,
  ICompany,
  IUser,
} from "./types";
export class ReducedAddress implements IReducedAddress {
  constructor(public city: string) {}
}
export class FullAddress extends ReducedAddress implements IFullAddress {
  constructor(city: string, public zipcode: string, public street: string) {
    super(city);
  }
}
export class Company implements ICompany {
  constructor(public name: string) {}
}

export abstract class UserAbstract {
  constructor(public id: number, public name: string) {}
}
export class UserCard extends UserAbstract implements IUserCard {
  address: ReducedAddress;
  company: Company;
  constructor(
    id: number,
    name: string,
    company: ICompany,
    address: ReducedAddress
  ) {
    super(id, name);
    this.address = address;
    this.company = company;
  }
}
export class User extends UserAbstract implements IUser {
  address: FullAddress;
  constructor(
    id: number,
    name: string,
    public username: string,
    public email: string,
    address: FullAddress,
    public phone: string,
    public website: string
  ) {
    super(id, name);
    this.address = address;
  }
}
