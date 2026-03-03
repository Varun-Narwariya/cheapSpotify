import { configDotenv } from 'dotenv';
configDotenv()
import ImageKit from '@imagekit/nodejs';
const client =new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})

const uploadFile=async(file)=>{
    const result=await client.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"cheapspotify/music"
    });
    return result;
}
export{uploadFile};