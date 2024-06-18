import { createContext, useContext, useState} from "react";

const RegisterContext = createContext();

const RegisterProvider = ({children}) =>
{
    const [ email, setEmail ] = useState(null);
    const [ registeredData, setRegisteredData ] = useState(null);

    return(
        <RegisterContext.Provider value={{email, setEmail, registeredData, setRegisteredData}}>
            {children}
        </RegisterContext.Provider>
    )
}

const useRegister = () =>
{
    return useContext(RegisterContext);
}

export { useRegister, RegisterProvider }