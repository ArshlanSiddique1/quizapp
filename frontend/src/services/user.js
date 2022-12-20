import { API_URL } from '../config';
import axios from 'axios';

export async function setUserData(data) {
    console.log("data", data)
    localStorage.setItem("UsersData", JSON.stringify(data));
}

export async function getToken() {
    let userData = JSON.parse(localStorage.getItem("UsersData"));
    return userData?.accessToken;
}



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
    console.log("data", data)
    const request = axios(config);
    const dataPromise = request.then((response) => response)
    // console.log("data.dataPromise", data.dataPromise);
    return dataPromise;
}


