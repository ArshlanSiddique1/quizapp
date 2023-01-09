import { API_URL } from '../config';
import axios from 'axios';


export const multerFileUploader = async (file) => {

    try {
        const formData = new FormData();
        formData.append('tempImage', file)

        const res = await axios.post(`${API_URL}/sectors/images`, formData)

        if (res) {
            const data = res.data;
            const filePath = data.name;
            return (filePath);
        }
        else {
            return null;
        }
    }
    catch (e) {
        console.log({ e })
    }
}