import {put} from '@vercel/blob';
import {NextRequest} from 'next/server'
import {createClient} from 'src/supabase/serverClient'
import {PICTURE_TABLE} from 'src/supabase/tablenames'
import {MemeEntry} from 'src/app/memes/_types/meme-entry-types'

export async function POST(request: NextRequest) {
    console.log('executing GET route handler for /memes');
    console.log('request', request)

    const data = await request.formData();
    console.log('data', data);

    const file = data.get('file') as File;
    const tagArray = data.get('tags') as unknown as string[];
    console.log('tags', tagArray);

    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true
    })

    console.log('blob', blob)

    const supabase = await createClient();

    const {data: entries} = await supabase.from(PICTURE_TABLE).select();

    console.log('entries', entries);

    const supabaseResponse = await supabase
        .from(PICTURE_TABLE)
        .insert({blob_url: blob.downloadUrl, tags: tagArray} as MemeEntry);

    console.log('error', supabaseResponse)

    return Response.json(blob.url);
}
