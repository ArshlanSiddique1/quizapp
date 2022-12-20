import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';





export async function setSector(datas) {
    let tokenId = await getToken();
    console.log("tokenId", tokenId)
    let data = JSON.stringify({
        "title": datas.title,
        "ShortDescription": datas.ShortDescription,
        "metaTitle": datas.metaTitle,
        "metaDescription": datas.metaDescription,
        "status": datas.statusBtn,
        // "featured": datas.feature
    });
    let config = {
        method: 'post',
        url: `${API_URL}/sectors`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
        data: data
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    // console.log("dataPromise",dataPromise)
    return dataPromise;
}


export async function getSector(data) {
    let config = {
        method: 'get',
        url: `${API_URL}/sectors`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    // console.log("dataPromise",dataPromise)
    return dataPromise;
}