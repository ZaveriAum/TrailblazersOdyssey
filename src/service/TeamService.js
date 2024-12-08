import axios from 'axios'
const BaseURI = "http://10.0.0.26:5001"

const TeamService = {
    async getMember(id){
        const response = await axios.get(`${BaseURI}/api/v1/team/${id}`);
        return response;
    },

    async getTeam(){
        const response = await axios.get(`${BaseURI}/api/v1/team`);
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

    async deleteMember(id) {
        try {
            const response = await axios.delete(`${BaseURI}/api/v1/team/${id}`);
            return response.data;  
        } catch (error) {
            console.error("Error deleting member:", error);
            throw error;  
        }
    },
}

export default TeamService