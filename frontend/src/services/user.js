import { API_URL } from '../config';
import axios from 'axios';

export async function setUserData(data) {
    localStorage.setItem("UsersData", JSON.stringify(data));
}

export async function getToken() {
    let userData = JSON.parse(localStorage.getItem("UsersData"));
    return userData?.accessToken;
}

// export async function getUserData() {
//     return JSON.parse(localStorage.getItem("AmericanGameUsers"));
// }



// export async function getUserId() {
//     let userData = JSON.parse(localStorage.getItem("AmericanGameUsers"));
//     if (userData)
//         return userData?._id;
//     else
//         return null
// }



export async function loginUser(datas) {
    let tokenId = await getToken();
    let data = JSON.stringify({
        "email": datas.email,
        "password": datas.password
    });
    let config = {
        method: 'post',
        url: `${API_URL}/users/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}


