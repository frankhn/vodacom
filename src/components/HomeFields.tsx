import React, { useEffect, useState } from "react";
import 'react-phone-input-2/lib/style.css'
import { AiFillChrome, AiOutlineClose } from 'react-icons/ai'
import { VscFileSubmodule } from 'react-icons/vsc'
import { MdDone } from 'react-icons/md'
import Modal from 'react-modal';
import Axios from "axios";
import { ProgressBar } from 'react-bootstrap'
import { useHistory } from "react-router";

const initialState: any = {
    modal: false,
    video: {},
    path: '',
    uploading: false,
    uploadMessage: '',
    uploadShown: false,
    terms: true
}

export default ({ handler }: any) => {
    const [state, setState] = useState(initialState)
    const [progress, setProgress] = useState(0)

    const location = useHistory()

    const uploadFile = (e: any) => {
        e.preventDefault()
        console.log(e.target.files[0])
        const path = URL.createObjectURL(e.target.files[0])
        setState({ modal: true, video: e.target.files[0], path })
    }

    const closeModal = () => setState({ ...state, modal: false })

    const publishVideo = () => {
        const formData = new FormData()
        formData.append('file', state.video)
        formData.append('upload_preset', "mps9eve3")
        console.log('uploadin ')
        setState({ modal: false, uploading: true })
        Axios
            .post("https://api.cloudinary.com/v1_1/camveni/video/upload",
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: data => {
                    setProgress(Math.round((100 * data.loaded) / data.total))
                },
            })
            .then((res) => {
                setState({ uploading: false, uploadShown: true, upload: 'success', uploadMessage: 'Video Uploaded successfully' })
            })
            .catch((err) => {
                setState({ uploading: false, uploadShown: true, upload: 'failed', uploadMessage: 'Video upload failed, try again' })
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setState({ ...state, terms: false })
        }, 5000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            return setState({ ...state, uploadResShow: false })
        }, 3000)
    }, [state.uploadShown])

    const goToListVideos = () => location.push('/candidate')

    return (
        <div className="flex flex-col justify-center">
            <div className="text-2xl py-3 px-4 text-center font-normal border-b-2">
                Bienvenue
            </div>
            {
                state.terms && <div className="border-1 m-3 p-3" style={{
                    boxShadow: "0px 0px 16px -2px rgba(0,0,0,0.75)"
                }}>
                    <div>
                        <p>
                            Pour continue vous devez consulter et
                            accepter les termes et conditions de concours,
                            Cliquez ici pour consulter
                        </p>
                        <span>Cochez pour accepter</span>
                    </div>
                </div>
            }
            {
                state.uploading
                    ? progress && <div className="border-1 m-3 p-3" style={{
                        boxShadow: "0px 0px 16px -2px rgba(0,0,0,0.75)"
                    }}>
                        <div className="flex justify-end">
                            <div onClick={closeModal} className=""><AiOutlineClose /></div>
                        </div>
                        <div className="pr-10 h-1.5 mb-2 overflowhidden flex flex-col flex-start">
                            <ProgressBar visuallyHidden bsPrefix={''} now={progress} variant="danger" />
                        </div>
                        <p>{((100 - progress) * 5) / 100} minutes restantes</p>
                    </div>
                    : null
            }
            {
                state.uploadShown && <div className="border-1 m-3 p-3" style={{
                    boxShadow: "0px 0px 16px -2px rgba(0,0,0,0.75)"
                }}>
                    <div className="flex flex-col justify-center">
                        <div className="self-center bg-red-700 w-6 h-6 flex justify-center rounded-full overflowhidden">
                            <MdDone color={'white'} className="self-center text-center" />
                        </div>
                        <p className="self-center text-center mt-2">Vous allez recevoir un message apres validation des jury</p>
                    </div>
                </div>
            }
            <div className="mt-8">
                <div className="bg-blue-500 flex flex-row rounded-lg mx-2">
                    {/* <input type="file"
                        accept="video/mp4,video/x-m4v,video/*"
                        style={{
                            opacity: 0,
                            border: "none",
                            borderRadius: "3px",
                            background: "grey",
                            position: "absolute",
                            left: "0px",
                            width: "100%",
                            top: 0,
                            height: "100%"
                        }}  /> */}
                    <div className="bg-blue-800 self-center rounded-lg py-8 px-5">
                        <AiFillChrome size={30} color={'white'} />
                    </div>
                    <div className="bg-blue-500 py-4 px-3">
                        <p className="text-white text-2xl">Camera</p>
                        <input style={{ border: 'none', }}
                            type="file"
                            onChange={uploadFile}
                            accept="video/mp4,video/x-m4v,video/*" />
                        <p className="text-white font-light capitalize">enregistrer une video</p>
                    </div>
                </div>
                <div onClick={goToListVideos} className="bg-yellow-400  flex flex-row rounded-lg mx-2 mt-5">
                    <div className="bg-yellow-500 self-center rounded-lg py-8 px-5">
                        <VscFileSubmodule size={30} color={'white'} />
                    </div>
                    <div className="bg-yellow-400 mt-4 px-4">
                        <p className="text-white text-2xl">Fichiers</p>
                        <p className="text-white font-light capitalize">pendre une video dans vos fichiers</p>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={state.modal}
                contentLabel="Upload video"
                style={{
                    content: {
                        bottom: '0',
                        left: '0',
                        right: '0',
                        top: '16%'
                    }
                }}
            >
                <div className="flex justify-end">
                    <div onClick={closeModal} className=""><AiOutlineClose /></div>
                </div>
                <p>Votre video {state.video?.name}</p>
                <div>
                    <textarea className="border-2 border-gray-300 rounded-lg" />
                </div>
                <div className="mt-5">
                    <video width="420" height="550" controls autoPlay>
                        <source src={state.path} type="video/webm" />
                        <source src={state.path} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={publishVideo}
                        className="px-20 text-white mt-10 py-3 bg-red-700 rounded-3xl">
                        Publier
                    </button>
                </div>
            </Modal>
        </div>
    );
};
