
const Offre = require('../model/offre')
const Speciality = require('../model/speciality')
const place = require('../model/place')
const company = require('../model/company')
const skills = require('../model/skills')
const { populate } = require('../model/comments')




createOffre = async (req, res) => {
  const offre = new Offre(req.body)
  await offre.save()
  await company.findByIdAndUpdate(
    { _id: req.body.company },
    { $push: { offres: offre } }

  )
  await place.findByIdAndUpdate({
    _id: req.body.place
  }, { $push: { offres: offre } })

  await Speciality.findOneAndUpdate({
    _id: req.body.speciality
  },
    { $push: { offres: offre } })
  await skills.findByIdAndUpdate({
    _id: req.body.contract

  },
    { $push: { offres: offre } })


  res.status(200).json({
    data: offre,
    msg: 'offre created'
  })

}



gettAllOffres = async (req, res) => {

  try {
    const offres = await Offre.find({}).populate('place').populate('company').populate('speciality').populate('contract').populate('candidancies').populate({ path: 'comments', select: 'candidate' }).populate({ path: 'candidancies', select: 'candidate' })   //  ///// populate({ path: 'fans', select: 'name' }).


    res.status(200).json({
      data: offres,
      msg: 'list offres'
    })
  } catch (error) {

    res.status(404).json({
      msg: 'cannot get offres' + error.message
    })
  }


}
getoffreById = async (req, res) => {   ////////////////////////////////////////////////////////////////////////////// populate({ path: 'fans', select: 'name' }).
  try {
    const offre = await Offre.findById({ _id: req.params.id }).populate('contract').populate('place').populate('company').populate('speciality').populate({ path: "comments", populate: { path: "candidate" } }).populate('candidancies').populate({ path: "candidancies", populate: { path: "candidate" } })
    res.status(200).json({
      msg: "id get with no errors",
      data: offre,
    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to get id" + error.message,
    });
  }
};
updateOffre = async (req, res) => {
  try {
    // req.body after getting the id and change it with req.body
    await Offre.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      msg: "updated with no errrors",

    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to update " + error.message,
    });
  }
};
deleteOffre = async (req, res) => {




  await Offre.deleteOne({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted'
  })
}












module.exports = {
  createOffre, gettAllOffres, getoffreById, updateOffre, deleteOffre
}