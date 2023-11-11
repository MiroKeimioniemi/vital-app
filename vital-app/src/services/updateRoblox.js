import axios from 'axios';

const url = ''

const postData = (data) => {
    return axios.post(url, data).then(response => response.data)
}

export default postData;