import { useState } from "react";
import 'react-phone-input-2/lib/style.css'
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Login from "./login";
import Verify from "./verify";

export default () => {
    const [state, setState] = useState({ phone: '', loggedIn: false })
    const location = useHistory();
    const { auth, setAuth }: any = useAuth()

    const verifyAccount = () => {
        if (state.phone.length === 15) {
            setAuth(state.phone)
            return location.push('/home')
        }
        return setState({ ...state, loggedIn: true })
    }

    return (
        <div className="flex flex-col justify-center">
            {
                !state.loggedIn
                    ? <Login setPhone={(phone: any) => setState({ ...state, phone, loggedIn: true })} />
                    : <Verify handler={verifyAccount} />
            }
        </div>
    );
};
