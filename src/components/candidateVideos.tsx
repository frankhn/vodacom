import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from 'react-icons/io'
import { useHistory } from "react-router";
import {Cloudinary} from 'cloudinary-core'

export default () => {
    const [videos, setVideos] = useState([])
    const location = useHistory()
    const goBack = () => location.push('/home')
    const cloud = new Cloudinary({
        cloud_name: "camveni",
        api_key: "384589774575885",
        api_secret: "SXTc92FU74XCSdB_LJKOyqetNZs",
        secure: true
    })

    const getVideoTrans = (pbId:string) => {
        const img = cloud.video_thumbnail_url(pbId, {
            width: '7rem'
        })
        return img
    }

    useEffect(() => {
        (async () => {
            const videos = await axios.get('http://192.168.1.149:5000/videos')
            const res: any = videos.data
            setVideos(res.data.resources)
        })()
    }, [])
    return (
        <div className="flex flex-col">
            <div className="flex flex-row text-2xl text-center font-normal border-b-2">
                <IoMdArrowBack size={40} onClick={goBack} className="mr-8" />
                Video des candidats
            </div>
            <div className="mt-4 px-4 ">
                {
                    videos &&
                    videos.map((video:any) => 
                        <div onClick={() => location.push(`/video/${video.filename}`)} key={video.asset_id} className="flex flex-row mt-4" style={{ boxShadow: "0px 0px 16px -2px rgba(0,0,0,0.75)" }}>
                            <div className="pr-2">
                                <img style={{
                                    objectFit: 'contain',
                                    // width: '100%', height: '100%'
                                }} src={`${getVideoTrans(video.public_id)}`} />
                            </div>
                            <div className="flex flex-1 flex-col py-3 px-4 flex-shrink">
                                <p className="text-lg font-bold">Candidat n 1</p>
                                <p className="font-light text-xs lowercase">Candidat n 1</p>
                                <button className="bg-red-700 my-4 text-white py-2 px-4 rounded-3xl">Noter la video</button>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};
