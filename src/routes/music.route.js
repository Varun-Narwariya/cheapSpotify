import express from 'express'
import {authArtist,  authUser } from '../middlewares/auth.middleware.js'
import {createMusic,createAlbum, getAllMusic,getAllAlbum,getAlbumById} from '../controllers/music.controller.js'
import multer from 'multer'

const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router()


router.post('/upload',authArtist,upload.single("music"),createMusic)
router.post('/album',authArtist,createAlbum)
router.get('/',authUser,getAllMusic)
router.get('/getAlbums',authUser,getAllAlbum)
router.get('/album/:albumId',authUser,getAlbumById)



export default router;