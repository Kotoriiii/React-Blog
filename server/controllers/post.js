import { dbQuery } from "../db/dbQuery.js"
import {jwtVerify} from "../jwt/jwtVerify.js"

export const getPosts = async (req, res) => {

    const sql = req.query.cat 
    ? "SELECT * FROM posts where cat = ?" 
    : "SELECT * FROM posts "

    try{
      let data = await dbQuery(sql,[req.query.cat])
      res.status(200).json(data)
    }
    catch(err){
      return res.status(500).json(err)
    }


}

export const getPost = async (req, res) => {
    const sql = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? "

    try{
      let data = await dbQuery(sql,[req.params.id])
      res.status(200).json(data[0])
    }
    catch(err){
      return res.status(500).json(err)
    }

}

export const addPost = async (req, res) => {
    if(!req.headers["authorization"]){
      return res.status(401).json("Not authenticated!");
    }

    const token = req.headers["authorization"].split(" ")[1]  


    const sql ="INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?,?,?,?,?,?)"

    const {title, desc, img, cat, date} = req.body

    try{
      let userInfo = await jwtVerify(token, "jwtkey")
      await dbQuery(sql, [title,desc,img,cat,date,userInfo.id])
      res.json("Post has been created.");
    }
    catch(err){
      res.status(403).json(err);
    }
}

export const deletePost = async (req, res) => {
    if(!req.headers["authorization"]){
      return res.status(401).json("Not authenticated!");
    }

    const token = req.headers["authorization"].split(" ")[1]

    const postId = req.params.id
    const sql = "delete from posts where `id` = ? and `uid` = ?"

    try{
      let userInfo = await jwtVerify(token, "jwtkey")
      await dbQuery(sql, [postId,userInfo.id])
      res.json("Post has been delete.");
    }
    catch(err){
      res.status(403).json(err);
    }

}

export const updatePost = async (req, res) => {
    if(!req.headers["authorization"]){
      return res.status(401).json("Not authenticated!");
    }

    const token = req.headers["authorization"].split(" ")[1]

    const postId = req.params.id;
    const {title,desc,img,cat} = req.body;
    const sql = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    try{
      let userInfo = await jwtVerify(token, "jwtkey")
      await dbQuery(sql, [title,desc,img,cat,postId,userInfo.id])
      res.json("Post has been updated.");
    }
    catch(err){
      res.status(403).json(err);
    }
  
}