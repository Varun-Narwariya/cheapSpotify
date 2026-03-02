import express from 'express'
import createMusic from '../controllers/music.controller'


const router = express.Router()

router.post('/upload',createMusic)



export default router;