import {useHttp} from "../hooks/useHttp";

const useUsersService = () => {
    const {request} = useHttp()
    const api = 'https://jsonplaceholder.typicode.com/users';

    const getAllUsers = async () => {
        
        const res = await request(api);
        
        return res.map(_tranformUsers);
    }

//     const getAllCharacters = async (offset = _baseOffset) => {
//         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        
//         return res.data.results.map(_tranformCharacter);
//      }
//   const _transformComics = (comics) => {
//          return {
//              id: comics.id,
//              title: comics.title,
//              price: comics.prices[0].price === 0 ? 'NOT AVAILABLE' : comics.prices[0].price + '$',
//              pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
//              language: comics.textObjects.language || 'en-us',
//              thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension
//          }
//      }
    const _tranformUsers = (user) => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            zipcode: user.address.zipcode,
            city: user.address.city,
            company: user.company.name,
            street: user.address.street,
            website: user.website
        }
    }
    return {getAllUsers}
}
export default useUsersService