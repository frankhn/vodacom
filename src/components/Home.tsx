import { useState } from "react";
import HomeFields from './HomeFields'
import Upload from "./candidateVideos";

export default () => {
    const [state, setState] = useState({
        home: true,
        upload: false
    })

    console.log('renderd home f')
    return (
        <>
            {
                state.home
                    ? <HomeFields handler={() => setState({ ...state, home: false, upload: true })} />
                    : state.upload
                        ? <Upload />
                        : null
            }
        </>
    );
}