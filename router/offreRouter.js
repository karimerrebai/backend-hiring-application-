const router = require('express').Router()
const offreController = require('../controllers/offre')

router.post('/createOffre', offreController.createOffre)
router.get('/allOffres', offreController.gettAllOffres)
router.get('/offreById/:id', offreController.getoffreById)
router.put('/updateOffre/:id', offreController.updateOffre)
router.delete('/delete/:id', offreController.deleteOffre)

module.exports = router 