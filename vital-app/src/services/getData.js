import axios from 'axios';

const url = ''

const getData = (previousWeeksData) => {
    return axios.post(url, previousWeeksData).then(response => response.data)
}

export default getData;