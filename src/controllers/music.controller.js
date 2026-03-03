import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import{ uploadFile } from "../services/storage.service.js";

const createMusic = async (req,res)=>{

    
 
    const{title}=req.body
    const file= req.file
    
    if(!file){
        return res.status(400).json({message:"Music file required"})
    }
    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist:req.user.id

    })
    res.status(201).json({
        message:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist

        }
    })
    
}
const createAlbum = async (req,res)=>{
    
    
    const{title,musicIds}=req.body
    

    const album = await albumModel.create({
        title,
        artist:req.user.id,
        musics:musicIds

    })
    res.status(201).json({
        message:"album created successfully",
        music:{
            id:album._id,
            title:album.title,
            artist:album.artist,
            musics:album.musics


        }
    })
    
}
const getAllMusic = async (req,res)=>{
    const musics = await musicModel.
        find(). //finds all items
        skip(1). //skips id=tem
        limit(2). //limit no. of item requested, pagination can be done by skip and limit
        populate("artist","username email") // fills more details
    
    res.status(200).json({
        message:"music fetched successfully",
        musics:musics
    })
}
const getAllAlbum = async (req,res)=>{
    const albums = await albumModel.find().populate("artist","username email")//.select("title artist").populate("musics")
    res.status(200).json({
        message:"albums fetched successfully",
        albums:albums
    })
}
const getAlbumById = async (req,res)=>{
    const albumId = req.params.albumId
    const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics")
    res.status(200).json({
        message:"album fetched successfully",
        album:album
    })
}
export {createMusic,createAlbum,getAllMusic,getAllAlbum,getAlbumById};