import { httpWithCreds } from "../../util/http"

export default async (id: string) => {
    return await httpWithCreds().get(`/hit?id=${id}`)
}