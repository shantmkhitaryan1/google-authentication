import {Router} from 'express'
const router = Router();
const indexController = require('../controllers/indexController')

router.get('/', indexController.renderHome)
router.get('/auth/google/callback', indexController.callback)
router.get('/logout', indexController.logout)
router.get('/downloadJSon/:id', indexController.downloadJson)

module.exports = router;