import {put} from '@vercel/blob';
import {NextRequest} from 'next/server'

export async function POST(request: NextRequest) {
    console.log('executing POST route handler');
    console.log('request', request)

    const data = await request.formData();
    console.log('data', data);

    const file = data.get('file') as File;

    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true
    })

    console.log('blob', blob)

    return Response.json(blob.url);
}
