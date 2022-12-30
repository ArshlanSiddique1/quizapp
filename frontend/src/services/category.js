import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';

export async function setCategory(datas) {
    // let tokenId = await getToken();
    console.log("tokenId", datas)
    
    let data = JSON.stringify({
        "sector_id":datas.sector_id,
        "title": datas.title,
        "description": datas.description,
        "shortDescription": datas.shortDescription,
        "metaTitle": datas.metaTitle,
        "metaDescription": datas.metaDescription,
        "status": datas.statusBtn,
        "featured": datas.featured,
        "subscription": datas.subscription
    });
    let config = {
        method: 'post',
        url: `${API_URL}/categories`,
        headers: {
            // 'authorization': tokenId,
            'Content-Type': 'application/json',
        },
        data: data
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}



export async function getCategory(data) {
    let config = {
        method: 'get',
        url: `${API_URL}/categories`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}



export async function getCategoryById(id) {
    let config = {
        method: 'get',
        url: `${API_URL}/categories/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    console.log("dataPromise", dataPromise)
    return dataPromise;
}





// Edit in category
export async function editCategory(value) {
    let tokenId = await getToken();
    let datas = JSON.stringify({
        "title": value.title,
        "description": value.description,
        "shortDescription": value.shortDescription,
        "metaTitle": value.metaTitle,
        "metaDescription": value.metaDescription,
        "status": value.statusBtn,
        "featured": value.featured,
        "subscription": value.subscription,
        "id": value.id
    });
    let config = {
        method: 'put',
        url: `${API_URL}/categories/${value?.id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        }, data: datas
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    console.log("dataPromise",dataPromise)
    return dataPromise;
}

export async function delCategory(id) {
    let tokenId = await getToken();
    let config = {
        method: 'delete',
        url: `${API_URL}/categories/${id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}
