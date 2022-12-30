import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';

export async function setGrade(datas) {
    let tokenId = await getToken();
    console.log("tokenId", tokenId)
    let data = JSON.stringify({
        "name": datas.gradeName,
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



export async function getGrade(data) {
    let config = {
        method: 'get',
        url: `${API_URL}/grades`,
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
    console.log("dataPromise", dataPromise)
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
