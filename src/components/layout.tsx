import React from "react";
import Header from "./Header";

interface ILayout {
    children: React.ReactNode;
}

export default ({ children }: ILayout) => {
    return (
        <div className="w-screen h-screen bg-red-500 px-5">
            <Header />
            {children}
        </div>
    );
};
