import { API_URL } from '../config';
import axios from 'axios';
import { getToken } from './user';


export async function setQuestion(datas) {
    let tokenId = await getToken();
    let data = JSON.stringify({
        "title": datas.title,
        "explanation": datas.explanation,
        "year": datas.year,
        "titles": datas.titles,
        "isCorrect": datas.isCorrect,
        "difficulty": datas.difficulty,
        "status": datas.statusBtn,
        "sector_id": datas.sector_id,
        "category_id": datas.category_id,
        "grade_id": datas.grade_id,
        "subject_id": datas.subject_id,
        "section_id": datas.section_id,
    });
    let config = {
        method: 'post',
        url: `${API_URL}/questions`,
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



export async function getQuestion(page,perPage,order) {
    let config = {
        method: 'get',
        url: `${API_URL}/questions/?current_page=${page}&${order}&per_page=${perPage}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    return dataPromise;
}



export async function getQuestionById(id) {
    let config = {
        method: 'get',
        url: `${API_URL}/questions/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = request.then((response) => response);
    console.log("dataPromise", dataPromise)
    return dataPromise;
}


// Edit in Question
export async function editQuestion(value) {
    let tokenId = await getToken();
    let datas = JSON.stringify({
        "title": value.title,
        "explanation": value.explanation,
        "year": value.year,
        "difficulty": value.difficulty,
        "titles": value.titles,
        "isCorrect": value.isCorrect,
        "status": value.statusBtn,
        "id": value.id
    });
    console.log("VAlue at Services", value)
    let config = {
        method: 'put',
        url: `${API_URL}/questions/${value?.id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        }, data: datas
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    console.log("dataPromise", dataPromise)
    return dataPromise;
}

export async function delQuestion(id) {
    let tokenId = await getToken();
    let config = {
        method: 'delete',
        url: `${API_URL}/questions/${id}`,
        headers: {
            'authorization': tokenId,
            'Content-Type': 'application/json',
        },
    };
    const request = axios(config);
    const dataPromise = await request.then((response) => response?.data);
    return dataPromise;
}
