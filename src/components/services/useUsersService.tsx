import { useHttp } from "../hooks/useHttp";
import { IUser, IUserCard } from "../../types/types";
import { UserCard, User, FullAddress, Company } from "../../types/classes";

const useUsersService = () => {
  const { request } = useHttp();
  const api = "https://jsonplaceholder.typicode.com/users";

  const getAllUsers = async () => {
    const res: IUserCard[] = await request(api);
    return res.map(_reduceUsers);
  };

  const getUser = async (id: number) => {
    const res: IUser = await request(`${api}/${id}`);
    return _reduceUser(res);
  };

  const _reduceUser = (user: IUser) => {
    return new User(
      user.id,
      user.name,
      user.username,
      user.email,
      new FullAddress(
        user.address.city,
        user.address.zipcode,
        user.address.street
      ),
      user.phone,
      user.website
    );
  };

  const _reduceUsers = (user: IUserCard) => {
    return new UserCard(user.id, user.name, user.company, user.address);
    return {
      id: user.id,
      name: user.name,
      company: {
        name: user.company.name,
      },
      address: {
        city: user.address.city,
      },
    };
  };

  // const _tranformUser = (user: IUser) => {
  //   return {
  //     id: user.id,
  //     name: user.name,
  //     username: user.username,
  //     email: user.email,
  //     phone: user.phone,
  //     address: {
  //       city: user.address.city,
  //       street: user.address.street,
  //       zipcode: user.address.zipcode,
  //     },
  //     company: {
  //       name: user.company.name,
  //     },

  //     website: user.website,
  //   };
  // };
  return { getAllUsers, getUser };
};
export default useUsersService;
