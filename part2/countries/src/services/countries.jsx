import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/'

const getall = () => {
    const searchUrl = `${baseUrl}all?fields=name,capital,area,languages,flags,latlng`
    const request = axios.get(searchUrl)
    return request.then(response => response.data)
}

export default { getall }