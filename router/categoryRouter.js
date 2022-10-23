const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
router.post('/createCategory', categoryController.createCategory)
router.get('/gettAllCategories', categoryController.gettAllCategories)
router.get('/getCategoryByid/:id', categoryController.getCategoryByid)
router.put('/updatecategory/:id', categoryController.updateCategory)
router.delete('/delete/:id', categoryController.deleteCategory)

module.exports = router 