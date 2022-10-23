const Candidacy = require('../model/candidacy')
const offre = require('../model/offre')
const candidate = require('../model/candidate')


createCandidacy = async (req, res) => {
  req.body["cv"] = req.file.filename;
  const candidacy = new Candidacy(req.body)
  await candidacy.save()
  await offre.findByIdAndUpdate(
    { _id: req.body.offre },
    { $push: { candidancies: candidacy } })
  await candidate.findByIdAndUpdate({
    _id: req.body.candidate
  },
    { $push: { candidancies: candidacy } })
  res.status(200).json({ msg: 'candidancy created', data: candidacy })
}
gettCandadicies = async (req, res) => {

  try {

    const candidacy = await Candidacy.find({}).populate('candidate').populate('offre').populate({ path: "offre", populate: { path: "company" } })
    res.status(200).json({
      data: candidacy,
      msg: 'list candidacies'
    })


  } catch (error) {

    res.status(404).json({
      msg: 'cannot get candadacies' + error.message
    })
  }


}
getCandidacyById = async (req, res) => {
  const candidacy = await Candidacy.findById({ _id: req.params.id }).populate('offre').populate({ path: "offre", populate: { path: "company" } })
  res.status(200).json({ data: candidacy, msg: 'Candadicy By id' })
}

updateCandidancy = async (req, res) => {
  const candidacy = await Candidacy.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({ msg: 'updated', data: candidacy })
}

deleteCandidacy = async (req, res) => {
  await Candidacy.findByIdAndDelete({ _id: req.params.id })
  res.send('deleted')
}

module.exports = { createCandidacy, gettCandadicies, getCandidacyById, updateCandidancy, deleteCandidacy }