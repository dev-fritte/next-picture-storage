import {Meme} from 'src/app/memes/_types/meme-types'
import {getBlobList} from 'src/app/memes/data'

type MemeResponse = {
    success: boolean,
    data: {
        memes: Meme[],
    }
}

export default async function MemesOverview() {

    const blobs = await getBlobList();

    // const memes = await fetch('https://api.imgflip.com/get_memes')
    //     .then(res => res.json())
    //     .then((resp: MemeResponse) => resp?.data?.memes)

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <p>{'Memes Overview'}</p>

                <div className={'flex flex-wrap gap-2'}>
                    {/*{memes.map((meme: Meme) => (*/}
                    {/*    <Image src={meme.url} alt={meme.name} key={meme.id} width={200} height={200}/>))}*/}

                    {blobs.map(blob => <p key={blob.pathname}>{blob.pathname}</p>)}
                </div>
            </main>
        </div>
    );
}
