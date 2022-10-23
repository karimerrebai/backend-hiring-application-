const skillControolers = require('../controllers/skills')
const router = require('express').Router()
router.post('/createSkills', skillControolers.createSkills)
router.get('/getallSkills', skillControolers.gettAllSkills)
router.get('/getSkillsById/:id', skillControolers.getskillsByid)
router.put('/update/:id', skillControolers.updateskills)
router.delete('/delete/:id', skillControolers.deleteSkills)

module.exports = router 