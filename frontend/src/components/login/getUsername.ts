import axios from "axios";

export default async (id: String) => await axios.get(`http://localhost:3000/getID?id=${id}`)