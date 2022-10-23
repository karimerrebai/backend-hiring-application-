const router = require('express').Router()
const specialityController = require('../controllers/specialityController')
router.post('/createSpeciality', specialityController.createSpeciality)
router.get('/getAllspecialities', specialityController.gettAllSpecialities)
router.get('/specialitybyId/:id', specialityController.getspecialtyByid)
router.put('/updateSpeciality/:id', specialityController.updateSpeciality)
router.delete('/delete/:id', specialityController.deleteSpeciality)
module.exports = router