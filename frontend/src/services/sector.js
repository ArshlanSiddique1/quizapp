import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';





export async function setSector(datas) {
    let tokenId = await getToken();
    let data = JSON.stringify({
        "title": datas.title,
        "shortDescription": datas.shortDescription,
        "description": datas.description,
        "metaTitle": datas.metaTitle,
        "metaDescription": datas.metaDescription,
        "status": datas.statusBtn,
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





export async function getSector(page, perPage, order = "") {
    let config = {
        method: 'get',
        url: `${API_URL}/sectors/?current_page=${page}&${order}&per_page=${perPage}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response?.data);
    return dataPromise;
}

// export async function getSector() {
//     let config = {
//         method: 'get',
//         url: `${API_URL}/sectors`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };
//     const request = axios(config);
//     const dataPromise = request.then((response) => response?.data);
//     return dataPromise;
// }




export async function getSectorById(id) {
    let config = {
        method: 'get',
        url: `${API_URL}/sectors/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}






export async function delSector(id) {
    let tokenId = await getToken();
    let config = {
        method: 'delete',
        url: `${API_URL}/sectors/${id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}








export async function EditSector(value) {
    let tokenId = await getToken();
    let datas = JSON.stringify({
        "title": value.title,
        "ShortDescription": value.description,
        "metaTitle": value.metaTitle,
        "metaDescription": value.metaDescription,
        "status": value.statusBtn,
        "id": value.id
    });
    let config = {
        method: 'put',
        url: `${API_URL}/sectors/${value?.id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        }, data: datas
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    // console.log("dataPromise", dataPromise)
    return dataPromise;
}