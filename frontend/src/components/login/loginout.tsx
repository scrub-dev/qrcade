import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated"
import LogOutBtn from "./LogOutBtn"
import LoginBtn from "./LoginBtn"
import { ReactNode } from "react"
export default () => {
    const isAuth = useIsAuthenticated()
    const Wrapper = (props: {children: ReactNode}) => <div>{props.children}</div>

    return (
        <Wrapper>
            {isAuth() ? <LogOutBtn/> : <LoginBtn/>}
        </Wrapper>
    )
}