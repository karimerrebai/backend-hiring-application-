const router = require('express').Router()
const placeController = require('../controllers/placeControllers')
router.post('/createPlace', placeController.createPlace)
router.get('/getAllPlaces', placeController.getAllPlaces)
router.get('/placeById/:id', placeController.getPlaceById)
router.put('/update/:id', placeController.updatePlaceByID)
router.delete('/delete/:id', placeController.deletePlace)
module.exports = router 
