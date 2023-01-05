import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';

export async function setSection(datas) {
    let tokenId = await getToken(); 
    let data = JSON.stringify({
        "title": datas.title,
        "image":datas.image,
        "description": datas.description,
        "shortDescription": datas.shortDescription,
        "metaTitle": datas.metaTitle,
        "metaDescription": datas.metaDescription,
        "status": datas.statusBtn,
        "sector_id": datas.sector_id,
        "category_id": datas.category_id,
        "grade_id": datas.grade_id,
        "subject_id": datas.subject_id
    });
    let config = {
        method: 'post',
        url: `${API_URL}/sections`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
        data: data
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}



export async function getSection(page,perPage,order) {
    let config = {
        method: 'get',
        url: `${API_URL}/sections/?current_page=${page}&${order}&per_page=${perPage}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}



export async function getSectionById(id) {
    let config = {
        method: 'get',
        url: `${API_URL}/sections/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    console.log("dataPromise", dataPromise)
    return dataPromise;
}





// Edit in Section
export async function editSection(value) {
    let tokenId = await getToken();
    let datas = JSON.stringify({
        "title": value.title,
        "image":value.image,
        "description": value.description,
        "shortDescription": value.shortDescription,
        "metaTitle": value.metaTitle,
        "metaDescription": value.metaDescription,
        "status": value.statusBtn,
        "id": value.id
    });
    let config = {
        method: 'put',
        url: `${API_URL}/sections/${value?.id}`,
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

export async function delSection(id) {
    let tokenId = await getToken();
    let config = {
        method: 'delete',
        url: `${API_URL}/sections/${id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}
