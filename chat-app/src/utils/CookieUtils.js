import Cookies from "js-cookie";
 
export function addUserCookie(data) {
    Cookies.set('user', JSON.stringify(data), { expires: 7 });
}

export function removeUserCookie() {
    Cookies.remove('user');
}

export default function getUserCookie() {
    let user = Cookies.get('user');
    try {
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
}