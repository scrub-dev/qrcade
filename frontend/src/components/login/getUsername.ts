import axios from "axios";

export default async (id: string) => (await axios.get(`http://localhost:3000/getUname?id=${id}`)).data.uname