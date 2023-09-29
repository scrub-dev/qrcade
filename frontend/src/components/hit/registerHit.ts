import axios from "axios"

export default async (id: string) => {
    return await axios.get(`http://localhost:3000/hit?id=${id}`, {
        withCredentials: true
    })
}