const Comments = require('../model/comments')
const Offre = require('../model/offre')
const Candidate = require('../model/candidate')
const comments = require('../model/comments')

createComment = async (req, res) => {
  const comment = new Comments(req.body)
  await comment.save()
  await Offre.findByIdAndUpdate(
    { _id: req.body.offre },
    { $push: { comments: comment } })
  await Candidate.findByIdAndUpdate(
    { _id: req.body.candidate },
    { $push: { comments: comment } })

  res.status(200).json({ msg: 'comment created', data: comment })

}
getAllcomments = async (req, res) => {
  const comment = await Comments.find({}).populate('candidate').populate('offre')
  res.status(200).json({ msg: "all comments", data: comment })
}
getCommentById = async (req, res) => {
  const comment = await Comments.findById({ _id: req.params.id }).populate('candidate')
  res.status(200).json({ data: comment, msg: 'comment By id' })
}



updateComment = async (req, res) => {
  const comment = await Comments.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json({ msg: 'updated', data: comment })

}
deleteComments = async (req, res) => {
  await Offre.findByIdAndUpdate(comments.offre, {
    $pull: { comments: req.params.id },
  });
  const deltedMessage = await Comments.deleteOne({ _id: req.params.id })
  res.json('deleted with success')
}

module.exports = { createComment, getAllcomments, getCommentById, updateComment, deleteComments }