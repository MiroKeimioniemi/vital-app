import axios from 'axios';

const url = 'https://rg-occ-det-func.azurewebsites.net/api/HttpTrigger1?code=xnuBqUdp5wWUwJoqxvzplZmFhie-1zlkmHkuNRmTcKTRAzFuzU61Bw=='

const getData = (previousWeeksData) => {
    return axios.post(url, previousWeeksData).then(response => response.data)
}

export default getData;