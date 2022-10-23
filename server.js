const express = require('express')
const { success, error } = require("consola");
const cors = require('cors')

const authRouter = require('./router/authrouter')
const categortRouter = require('./router/categoryRouter')
const specialityRouter = require('./router/specialityRouter')
const skillsRouter = require('./router/skillsRouter')
const offreRouter = require('./router/offreRouter')
const placeRouter = require('./router/placeRouter')
const commentRouter = require('./router/commentRouter')
const candidancyRouter = require('./router/candidacyRouter')


const app = express();
require('dotenv').config();
const DB = require('./config/db')


const PORT = process.env.PORT || 4000;

const DOMAIN = process.env.DOMAIN;


// using json format 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/getfile/:image', function (req, res) {
  res.sendFile(__dirname + '/stores/' + req.params.image)
  //req.params.image : input nom de l'image + extension(par exemple .png)
})
app.use('/', authRouter)
app.use('/category', categortRouter)
app.use('/speciality', specialityRouter)
app.use('/skills', skillsRouter)
app.use('/offre', offreRouter)
app.use('/place', placeRouter)
app.use('/comment', commentRouter)
app.use('/candidacy', candidancyRouter)


/*app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
}); */



app.listen(PORT, async () => {
  try {
    success({
      message: `server started on port ${PORT} ` + `URL ${DOMAIN}`,
      badge: true,
    });
  } catch (err) {
    error({ message: "error with server " + err.message, badge: true });
  }
});