const express = require('express');
const { PostKathaController, GetKathaController, HandleStatusKathaController, DeleteKathaController, upload } = require('../controllers/katha.controller');

const kathaRoutes = express.Router();

kathaRoutes.post('/post-katha', upload.fields([{ name: 'thumbNail' }, { name: 'video' }]), PostKathaController);
kathaRoutes.get('/', GetKathaController);
kathaRoutes.post('/change-status/:id', HandleStatusKathaController);
kathaRoutes.delete('/delete-katha/:id', DeleteKathaController);



module.exports = kathaRoutes;
