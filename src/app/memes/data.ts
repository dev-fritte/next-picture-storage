import {MemeResponse} from 'src/app/memes/_types/meme-types'
import {list} from '@vercel/blob'


export async function getMemes() {
    return await fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then((resp: MemeResponse) => resp?.data?.memes)
}

export async function getBlobList() {
    return await list().then(res => res.blobs);
}
