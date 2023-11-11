import axios from 'axios';

const url = 'https://rg-occ-det-func.azurewebsites.net/api/HttpTrigger2?code=HVPxhc8lgXOT4jk_NkJnwzt1_padqJbE8-rKRdBt8lTVAzFuhHNj_A=='

const postData = (data) => {
    return axios.post(url, data).then(response => response.data)
}

export default postData;