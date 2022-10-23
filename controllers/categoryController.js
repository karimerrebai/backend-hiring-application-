const Category = require('../model/category')


createCategory = async (req, res) => {
  console.log(req.body)
  const category = new Category(req.body)
  await category.save()
  res.status(200).json({
    data: category,
    msg: 'category created'
  })
}
gettAllCategories = async (req, res) => {

  try {

    const categories = await Category.find({})
    res.status(200).json({
      data: categories,
      msg: 'list categories'
    })


  } catch (error) {

    res.status(404).json({
      msg: 'cannot get categories' + error.message
    })
  }


}

getCategoryByid = async (req, res) => {

  const category = await Category.findById({ _id: req.params.id })
  res.status(200).json({
    data: category,
    id: 'category by id '
  })

}
updateCategory = async (req, res) => {
  try {
    // req.body after getting the id and change it with req.body
    const category = await Category.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      msg: "updated with no errrors",


    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to update " + error.message,
    });
  }
};
deleteCategory = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id })
  res.status(200).json({
    msg: 'deleted'
  })

}




module.exports = { createCategory, gettAllCategories, getCategoryByid, updateCategory, deleteCategory }
