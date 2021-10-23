import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext('');

export const useAuth:any = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
    const [auth, setAuth] = useState('');

    const providerValue: any = useMemo(() => ({ auth, setAuth }), [
        auth,
        setAuth
    ]);

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};
