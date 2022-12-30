import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';

export async function setSubject(datas) {
    let tokenId = await getToken();
    console.log("tokenId", tokenId)
    let data = JSON.stringify({
        "title": datas.title,
        "description": datas.description,
        "shortDescription": datas.shortDescription,
        "metaTitle": datas.metaTitle,
        "metaDescription": datas.metaDescription,
        "status": datas.statusBtn,
        "featured": datas.featured,
        "sector_id": datas.sector_id,
        "category_id": datas.category_id,
        "grade_id": datas.grade_id,
    });
    let config = {
        method: 'post',
        url: `${API_URL}/subjects`,
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


// export async function getSubject(data) {
//     let config = {
//         method: 'get',
//         url: `${API_URL}/subjects`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };
//     const request = axios(config);
//     const dataPromise = request.then((response) => response);
//     return dataPromise;
// }

export async function getSubject(data) {
    let config = {
        method: 'get',
        url: `${API_URL}/subjects`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}



export async function getSubjectById(id) {
    let config = {
        method: 'get',
        url: `${API_URL}/subjects/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    console.log("dataPromise", dataPromise)
    return dataPromise;
}





// Edit in Subject
export async function editSubject(value) {
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
        url: `${API_URL}/subjects/${value?.id}`,
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

export async function delSubject(id) {
    let tokenId = await getToken();
    let config = {
        method: 'delete',
        url: `${API_URL}/subjects/${id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}
