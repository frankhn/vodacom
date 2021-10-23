import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default ({ setPhone }: any) => {
    const [state, setState] = useState({ phone: '', invalid: '' })

    const updatePhone = (value: string, country: string, e: any, formattedValue: any) => {
        console.log(value)
        setState({ phone: `243${value}`, invalid: '' })
    }

    const verifyPhone = () => {
        console.log('redirecting', state, state.phone.length)
        if (state.phone.length === 15) {
            return setPhone(state.phone)
        }
        return setState({ ...state, invalid: 'Invalid phone number' })
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="text-2xl py-3 px-4 text-center font-normal border-b-2">
                Confirmer votre numero
            </div>
            <span className="text-red-600 text-center">{state.invalid ?? null}</span>
            <section className="px-10 flex flex-col justify-center">
                <div className="my-5 text-sm self-center text-center">
                    Pour valider votre inscription, veulliez inserer votre numero
                    <span className="font-bold"> Vodacom TV</span> pour verification
                </div>
                <div className="my-5">
                    <PhoneInput
                        containerClass={'w-8/12 rounded-3xl'}
                        country={'cd'}
                        value={state.phone}
                        placeholder={'Tapez le numero ici'}
                        countryCodeEditable={false}
                        onlyCountries={['cd']}
                        defaultMask={'.........'}
                        alwaysDefaultMask
                        onChange={updatePhone}
                        showDropdown={false}
                        disableDropdown
                        disableSearchIcon
                    />
                </div>
                <button
                    onClick={verifyPhone}
                    className="px-5 py-3 text-white text-center bg-red-700 rounded-3xl">
                    Envoyez le code de verification</button>
            </section>
        </div>
    );
};
