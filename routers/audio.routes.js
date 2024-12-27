const express = require('express');
const { PostAudioController, GetAudioController, upload } = require('../controllers/audio.controller');

const audioRoutes = express.Router();

audioRoutes.post('/post-audio', upload.fields([{ name: 'thumbNail' }, { name: 'audio' }]), PostAudioController);
audioRoutes.get('/', GetAudioController);

module.exports = audioRoutes;