import React, { useState } from "react";
import 'react-phone-input-2/lib/style.css'

export default ({ handler }: any) => {
    const [state, setState] = useState(false)

    return (
        <div className="flex flex-col justify-center">
            <div className="text-2xl py-3 px-4 text-center font-normal border-b-2">
                Confirmer votre numero
            </div>

            <section className="px-10 flex flex-col justify-center">
                <div className="my-5 text-sm self-center text-center">
                    Pour valider votre inscription, veulliez inserer votre numero
                    <span className="font-bold"> Vodacom TV</span> pour verification
                </div>
                <div className="my-5">
                    <input className="rounded-xl" onChange={(e: any) => {
                        e.preventDefault();
                        return setState(true)
                    }} />
                </div>
                <button
                    onClick={handler}
                    className="px-5 py-3 text-white text-center bg-red-700 rounded-3xl">
                    Verifier le code</button>
            </section>
        </div>
    );
};
