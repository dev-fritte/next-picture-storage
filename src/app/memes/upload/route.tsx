import {getMemes} from 'src/app/memes/data'
import {list, put} from '@vercel/blob';
import {NextApiRequest, NextApiResponse} from 'next'

export async function GET(request: Request) {
    console.log('executing POST route handler');
    console.log('request', request)

    const blobList = await list();

    console.log('blobList', blobList);

    const memes = await getMemes();

    return Response.json(memes)
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
    console.log('executing POST route handler');
    console.log('request', request)

    const data = request.body;

    console.log('data', data);

    const blob = await put(data.name, data.image, {
        access: 'public',
        addRandomSuffix: true
    })

    console.log('blob', blob)

    response.status(200).json(blob.url);
}
