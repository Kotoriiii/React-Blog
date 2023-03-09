import express from "express";
import postRoutes from "./routes/posts.js"
import usersRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express();

app.use(cookieParser())
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req,res)=>{
    res.status(200).json(req.file.filename)

})

app.use("/api/users",usersRoutes)
app.use("/api/posts",postRoutes)


app.listen(8800)