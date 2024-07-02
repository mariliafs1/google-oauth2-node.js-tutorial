import { Request, Response } from 'express';
import { User } from '../types'
import axios from 'axios'



const postVideo = async (req: Request, res: Response) => {
    const videoId = req.body.videoNovo as string | undefined;
    console.log('videoId',videoId);
   
    
    if (!videoId) {
        return res.status(400).send('Video ID is required');
    }

    try {
        const urlParams = new URLSearchParams(videoId.split('?')[1]);
        const extractedVideoId = urlParams.get('v');

        if (!extractedVideoId) {
            return res.status(400).send('Video ID not found in the URL');
        }

        const user = req.user as User;
        console.log("AQUIII O OBEJTO");
        console.log(user.accessToken);

        console.log(extractedVideoId); // "Vd1P_S__6y8"
        console.log(urlParams);
        await postToPlaylist(extractedVideoId, user);
        res.send(`Video postado com sucesso!`);

    } catch (error) {
        console.error('Error processing URL', error);
        res.status(500).send('Error processing URL');
    }
}

const postToPlaylist = async (extractedVideoId : string, user: User) => {
    try {
        if(!user.accessToken){
            throw new Error('Access token not available');
        }

        const apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id';
        const headers = {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type':'application/json'
        };

        const requestBody ={
            snippet:{
                playlistId: 'PL8k8RfOpelrcacUmsTS26-qRLLqYBZIH3',
                resourceId:{
                    kind: 'youtube#video',
                    videoId: `${extractedVideoId}`
                }
            }
        };

        const response = await axios.post(apiUrl, requestBody, {headers});
        console.log('Response da API', response.data);

    } catch (error) {
        console.error('Erro ao fazer a requisição POST:', error);
        throw error;
    }
}

export default postVideo;