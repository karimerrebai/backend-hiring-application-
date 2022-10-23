const router = require('express').Router()
const file = require('../middleware/cv')
const candidacyController = require('../controllers/candidacyController')
router.post('/create',file.single('cv'), candidacyController.createCandidacy)
router.get('/get', candidacyController.gettCandadicies)
router.get('/getById/:id', candidacyController.getCandidacyById)
router.put('/update/:id', candidacyController.updateCandidancy)
router.delete('/delete/:id', candidacyController.deleteCandidacy)
module.exports = router 
