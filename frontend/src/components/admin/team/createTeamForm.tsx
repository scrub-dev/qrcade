import { Field, Form, Formik, FormikValues } from "formik"
import { useState } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful"
import { defaultButtonStyle } from "../../core/Button"
import request from "../../util/connection/request"


export interface TCreateTeamFormProps {
    LobbyID: string
}
export default (props: TCreateTeamFormProps) => {

    const [colour, setColour] = useState("#000000")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const clearFeedback = () => {
        setError("")
        setSuccess("")
    }

    const handleSubmit = async (values: FormikValues) => {
        values.teamColour = colour
        let lobbyID = props.LobbyID

        if( values.teamName.length <= 0 ||  values.teamName == undefined) return setError("Please enter a team name")
        if( values.teamColour.length <= 0 ||  values.teamColour == undefined) return setError("Please select a team colour")
        if( lobbyID.length <= 0 || lobbyID == undefined) return setError("Invalid Lobby ID")
        console.log(values)
        let res = await request.patch(`lobby/${lobbyID}/add/team`, {data: values})
        console.log(res)

        // Does lobby exist
        // Does lobby require teams

        // create team
        // wait response
    }
    return (
    <div className="CreateTeamForm">
        <Formik
            initialValues={{
                teamName: ""
            }}
            onSubmit={(values, {resetForm}) => { handleSubmit(values); resetForm()}}
        >
            <Form onChange={clearFeedback}>
                <div id="formBox" className="flex flex-col py-2">
                    <div id="TeamName" className="flex flex-col items-center justify-center mb-2">
                        <label htmlFor="teamName" className="font-bold w-full">Team Name</label>
                        <Field type="text" name="teamName" className="text-black rounded shadow-main_light shadow-xl w-full p-2 mb-2"/>
                    </div>
                    <div id="TeamColour" className="flex flex-col py-2">
                        <label htmlFor="teamName" className="font-bold w-full">Team Colour</label>
                        <HexColorInput color={colour} onChange={setColour} className="text-black rounded shadow-main_light shadow-xl w-full p-2 mb-2" prefixed/>
                        <HexColorPicker color={colour} onChange={setColour}/>
                    </div>
                    <div id="submitSection" className="flex flex-wrap items-center justify-center gap-2 my-4">
                        <button type="submit" className={defaultButtonStyle}>Create Team</button>
                    </div>
                </div>
            </Form>

        </Formik>
        <div id='errorBox' className='absolute font-extrabold flex items-center justify-center left-0 right-0 m-auto'>
            <p className='text-failure '>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    </div>)
}