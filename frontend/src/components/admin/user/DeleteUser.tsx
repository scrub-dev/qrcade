import { useFormik } from "formik"
import { httpWithCreds } from "../../../util/http"

export default () => {
    const onSubmit = async (data: Object) => {
        console.log(data)
        await httpWithCreds().post(`/admin/player/delete`, data)
    }

    const formik = useFormik({
        initialValues: {
            user_id: 0
        },
        onSubmit
    })

    const deleteUserForm = (
        <form onSubmit={formik.handleSubmit}>
            <input type="number"
            className="m-auto w-full appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white"
            name="user_id"
            id="user_id"
            value={formik.values.user_id}
            onChange={formik.handleChange}
            ></input>
            <button type="submit" className="bg-purple-600 text-white py-1 px-4 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50">Delete User</button>
        </form>
    )



    return (
        deleteUserForm
    )
}