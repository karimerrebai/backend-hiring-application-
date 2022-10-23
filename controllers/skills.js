const Skills = require('../model/skills')



createSkills = async (req, res) => {
  try {

    const skills = new Skills(req.body)
    await skills.save()
    res.status(200).json({
      data: skills,
      msg: 'skills created'
    })

  } catch (error) {
    res.status(200).json({
      msg: error.message + 'failed to create skills'

    })

  }
}
gettAllSkills = async (req, res) => {

  try {

    const skills = await Skills.find({})
    res.status(200).json({
      data: skills,
      msg: 'list skills'
    })


  } catch (error) {

    res.status(404).json({
      msg: 'cannot get skills' + error.message
    })
  }


}
getskillsByid = async (req, res) => {
  try {
    const skills = await Skills.findById({ _id: req.params.id });
    res.status(200).json({
      msg: "id get with no errors",
      data: skills,
    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to get id" + error.message,
    });
  }
};


updateskills = async (req, res) => {
  await Skills.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({
    msg: 'updated'
  })

}
deleteSkills = async (req, res) => {
  const skills = await Skills.deleteOne({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted'
  })
}







module.exports = {
  createSkills, gettAllSkills, getskillsByid, updateskills, deleteSkills

}