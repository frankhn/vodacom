import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useParams, useHistory } from "react-router";

export default () => {
    const march: any = useParams()
    const location = useHistory()
    const goBack = () => location.push('/candidate')

    return (
        <div className="flex flex-col">
            <div className="flex flex-row text-2xl text-center font-normal border-b-2">
                <IoMdArrowBack size={40} onClick={goBack} className="mr-8" />
                Noter la video
            </div>
            <video width="420" height="550" controls autoPlay>
                <source
                    src={`https://res.cloudinary.com/camveni/video/upload/v1635000369/vodacom/${march.id}.mkv`}
                    type="video/mkv" />
                <source
                    src={`https://res.cloudinary.com/camveni/video/upload/v1635000369/vodacom/${march.id}.mkv`}
                    type="video/ogg" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
