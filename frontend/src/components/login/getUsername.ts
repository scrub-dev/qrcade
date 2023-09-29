import { http } from "../../util/http";

export default async (id: string) => (await http().get(`/getUname?id=${id}`)).data.uname