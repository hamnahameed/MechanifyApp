import axios from "axios";

const instance = axios.create({
    baseURL: 'https://ill-cyan-sea-urchin-sock.cyclic.app/api'
})

export default instance;