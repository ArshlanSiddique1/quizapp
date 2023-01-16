import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';

export async function setGrade(datas,image) {
    let tokenId = await getToken();
    let data = JSON.stringify({
        "name": datas.gradeName,
        "image":image,
        "status": datas.statusBtn,
        "featured": datas.featured,
    });
    let config = {
        method: 'post',
        url: `${API_URL}/grades`,
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



export async function getGrade(page, perPage, order) {
    let config = {
        method: 'get',
        url: `${API_URL}/grades/?current_page=${page}&${order}&per_page=${perPage}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise =await request.then((response) => response);
    return dataPromise;
}



export async function getGradeById(id) {
    let config = {
        method: 'get',
        url: `${API_URL}/grades/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response);
    return dataPromise;
}





// Edit in Grade
export async function editGrade(value) {
    let tokenId = await getToken();
    let datas = JSON.stringify({
        "name": value.gradeName,
        "status": value.statusBtn,
        "featured": value.featured,
        "id": value.id
    });
    let config = {
        method: 'put',
        url: `${API_URL}/grades/${value?.id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        }, data: datas
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}

export async function delGrade(id) {
    let tokenId = await getToken();
    let config = {
        method: 'delete',
        url: `${API_URL}/grades/${id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}
