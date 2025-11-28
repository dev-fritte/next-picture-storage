import {NextRequest} from 'next/server'
import {createClient} from 'src/supabase/serverClient'
import {PICTURE_TABLE} from 'src/supabase/tablenames'
import {MemeEntry} from 'src/app/memes/_types/meme-entry-types'


export async function GET(request: NextRequest) {

    const tags = request?.nextUrl?.searchParams.get('tags');
    console.log('/memes/find - find meme with tags: ', tags);

    const tagArray = Array.isArray(tags) ? tags : [tags]

    const supabase = await createClient();

    const supabaseResponse = await supabase
        .from(PICTURE_TABLE)
        .select()
        .overlaps('tags', tagArray as unknown as string[])

    const matchingMemes = supabaseResponse?.data;

    console.log('matching', matchingMemes);

    const selectedMeme = matchingMemes?.[Math.floor(Math.random() * matchingMemes?.length)] as MemeEntry;

    console.log('selectedMeme', selectedMeme, matchingMemes);

    return Response.json(selectedMeme);
}
