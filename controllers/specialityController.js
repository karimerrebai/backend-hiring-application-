const Speciality = require('../model/speciality')
const Category = require('../model/category')

createSpeciality = async (req, res) => {
  try {

    const spesiality = new Speciality(req.body)
    await spesiality.save()

    await Category.findByIdAndUpdate(
      { _id: req.body.category },
      { $push: { specialities: spesiality } }
    );

    res.status(200).json({
      data: spesiality,
      msg: 'speciality created'
    })

  } catch (error) {
    res.status(200).json({
      msg: error.message + 'failed to create specialty'

    })

  }
}

gettAllSpecialities = async (req, res) => {

  try {

    const specialities = await Speciality.find({}).populate('category')
    res.status(200).json({
      data: specialities,
      msg: 'list specialities'
    })


  } catch (error) {

    res.status(404).json({
      msg: 'cannot get specialities' + error.message
    })
  }


}
getspecialtyByid = async (req, res) => {
  try {
    const speciality = await Speciality.findById({ _id: req.params.id });
    res.status(200).json({
      msg: "id get with no errors",
      data: speciality,
    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to get id" + error.message,
    });
  }
};



updateSpeciality = async (req, res) => {
  try {
    await Speciality.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).json({
      msg: 'updated',

    })
  } catch (error) {
    res.status(404).json({
      msg: 'failed to update' + error.message
    })
  }
}

deleteSpeciality = async (req, res) => {
  const cateory = await Speciality.deleteOne({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted'
  })
}


module.exports = {
  createSpeciality, getspecialtyByid,
  gettAllSpecialities, updateSpeciality, deleteSpeciality
}