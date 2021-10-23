import React from "react";
import { AiFillCopyrightCircle } from "react-icons/ai";

export default () => {
    return (
        <div className="flex flex-row bg-red-700 w-full p-4">
            <div><AiFillCopyrightCircle size={50} /></div>
            <div className="flex flex-col px-3 justify-center text-xl capitalize text-white">Portail d'inscription</div>
        </div>
    );
};
