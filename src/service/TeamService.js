import axios from 'axios'
const BaseURI = "http://192.168.2.57:5000"

const TeamService = {
    async getMember(id){
        const response = await axios.get(`${BaseURI}/api/v1/team/${id}`);
        return response;
    },

    async getTeam(){
        const response = await axios.get(`${BaseURI}/api/v1/team`);
        console.log(response)
        return response;
    },

    async createMember(payload){
        const response = await axios.post(`${BaseURI}/api/v1/team`, payload);
        return response;
    },

    async updateMember(id, payload){
        const response = await axios.put(`${BaseURI}/api/v1/team/${id}`, payload);
        return response;
    },
}

export default TeamService