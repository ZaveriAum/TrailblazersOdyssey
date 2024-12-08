import axios from 'axios'
const BaseURI = "http://192.168.1.218:5001"

const PointService = {
    async getPoint(id){
        const response = await axios.get(`${BaseURI}/api/v1/points/${id}`);
        return response;
    },

    async getPoints(){
        const response = await axios.get(`${BaseURI}/api/v1/points`);
        console.log(response)
        return response;
    },

    async createPoints(payload){
        const response = await axios.post(`${BaseURI}/api/v1/points`, payload);
        return response;
    },

    async updatePoint(id, payload){
        const response = await axios.put(`${BaseURI}/api/v1/points/${id}`, payload);
        return response;
    },

    async getLatLong(address){
        const response = await axios.get(`https://geocode.maps.co/search?q=${address}&api_key=6748a42ba4a04952440853gyda9bb14`);
        return response
    }

}

export default PointService