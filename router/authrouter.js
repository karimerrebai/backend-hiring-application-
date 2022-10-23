
const passport = require('passport')
const checkIden = require('../middleware/checkIdentification')
const authentication = require('../middleware/passportAuthentication')

require('../middleware/passportAuthentication').passport

const authRouter = require('../controllers/authcontroller')
const router = require('express').Router()
const images = require("../middleware/files");
const { session } = require('passport');
router.post('/registerAdmin', images.single("photo"), authRouter.registerAdmin)
router.post('/registerCompany', images.single('photo'), authRouter.registerCompany)
router.post('/registerCandidate', images.single('photo'), authRouter.registerCandidate)
router.post('/login', authRouter.login)
router.get('/profile', checkIden, authRouter.profile)
router.get('/verifynow/:code', authRouter.verfiyEmail)
router.put('/updateProfile',
  passport.authenticate("jwt", { session: false }),
  authRouter.updateProfile
);
router.get('/candidateById/:id', authRouter.getcandidateByid)
router.get('/c/:id', authRouter.getCompanyById)
router.post('/resetPassword/:token',/*passport.authenticate("jwt", { session: false })*/ authRouter.resetPassword)

router.post("/forgetPassword", authRouter.forgetPassword);
router.get('/getAllCompanies', authRouter.getAllCompanies)
router.get('/confirmCompany/:id', authRouter.verifycompany)
router.get('/confirmOffre/:id', authRouter.verifyOffre)
router.get('/confirmCandidacy/:id', authRouter.confirmCandidacy)
router.get('/rejectCandidacy/:id', authRouter.rejectCandidacy)


router.post("/logout", authRouter.logout)
// delete Copany 
router.delete('/deleteCompany/:id', authRouter.deleteCompany)

module.exports = router;


