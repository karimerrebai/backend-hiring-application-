const router = require("express").Router()
const commentController = require('../controllers/commentsControllers')
/*const { route } = require("./placeRouter")*/
router.post('/create', commentController.createComment)
router.get('/getComments', commentController.getAllcomments)
router.get('/get/:id', commentController.getCommentById)
router.put('/update/:id', commentController.updateComment)
router.delete('/delete/:id', commentController.deleteComments)
module.exports = router