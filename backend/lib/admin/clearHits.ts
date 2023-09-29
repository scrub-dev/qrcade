import { Hit } from "../../models/hits.js"

export default async () => {
    Hit.truncate()
}