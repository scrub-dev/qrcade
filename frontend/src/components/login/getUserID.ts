import axios from "axios";

export default async (uname: String) => await axios.get(`http://localhost:3000/getID?uname=${uname}`)