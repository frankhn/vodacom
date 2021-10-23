import React from "react";
import Header from "./Header";

interface ILayout {
    children: React.ReactNode;
}

export default ({ children }: ILayout) => {
    return (
        <>
            <Header />
            <div className="w-screen h-screen">
                {children}
            </div>
        </>
    );
};
