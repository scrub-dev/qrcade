import { http } from "../../util/http";

export default async (uname: String) => await http().get(`/getID?uname=${uname}`)