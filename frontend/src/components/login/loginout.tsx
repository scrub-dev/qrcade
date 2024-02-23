import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated"
import LogOutBtn from "./LogOutBtn"
import LoginBtn from "./LoginBtn"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import ViewDashboardBtn from "../dashboard/ViewDashboardBtn"
import ViewRootBtn from "../root/ViewRootBtn"

export interface ILogInOutProps {
    isRoot?: boolean
}

export default (props: ILogInOutProps) => {

    const nav = useNavigate()
    const signOut = useSignOut()

    const isAuth = useIsAuthenticated()
    const Wrapper = (props: {children: ReactNode}) => <div>{props.children}</div>

    const handleOnClick_Login = () => {
        nav("/login")
    }

    const handleOnClick_Logout = () => {
        signOut()
        nav("/")
        // TODO:
        /**
         *  1. LEAVE TEAM
         *  2. LEAVE LOBBY
         */
    }

    return (
        <Wrapper>
            {isAuth() ? (
            <div className="flex gap-2">
                {(props.isRoot) ? <ViewDashboardBtn/> : <ViewRootBtn/>}
                <LogOutBtn onClick={handleOnClick_Logout}/>
            </div>
            ) : (
            <div className="flex gap-2">
                <LoginBtn onClick={handleOnClick_Login} />
            </div>
            )}
        </Wrapper>
    )
}
