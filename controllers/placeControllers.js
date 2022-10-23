const Place = require('../model/place')



createPlace = async (req, res) => {
  const place = new Place(req.body)
  await place.save()
  res.status(200).send({
    data: place,
    msg: 'place created'

  })
}
getAllPlaces = async (req, res) => {

  const places = await Place.find({}).populate('offres')
  res.status(200).json({
    data: places,
    msg: 'list of places'
  })


}

getPlaceById = async (req, res) => {
  const place = await Place.findById({ _id: req.params.id })
  res.status(200).send({ msg: 'place with id', data: place })
}
updatePlaceByID = async (req, res) => {
  const place = await Place.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.send({ msg: 'updated with success', data: place })
}
deletePlace = async (req, res) => {
  await Place.findByIdAndDelete({ _id: req.params.id })
  res.json('deleted')
}




module.exports = {
  createPlace, getAllPlaces, getPlaceById, updatePlaceByID, deletePlace
}
