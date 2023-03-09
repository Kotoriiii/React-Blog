import React, {useContext, useEffect, useState}from 'react'
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../components/Menu";
import { get, deletePost } from "../axios/request";
import moment from "moment"
import { AuthContext } from '../context/authContext';

const Single = () => {
    const[post, setPost] = useState({})

    const location = useLocation()
    const naviagte = useNavigate()

    const postId = location.pathname.split('/')[2]

    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
      const fetchData = async () => { 
        try{
          const res = await get(`/posts/${postId}`);
          console.log(res);
          setPost(res) 
        }catch(e){
          console.log(e)
        }
      }
      fetchData()
    },[postId])

    const handleDelete = async () => {
        try{
            await deletePost(`/posts/${postId}`);
            naviagte("/")
          }catch(e){
            console.log(e)
          }
    }

    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html,"text/html")
      return doc.body.textContent
    }

    return (
        <div className='single'>
            {!currentUser && naviagte("/login")}
            <div className="content">
                <img src={`../upload/${post?.img}`} alt=""/>
                <div className="user">
                    {post.userImg && (<img src={post.userImg} alt="" />)}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.data).fromNow()}</p>
                    </div>
                    {currentUser?.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div> 
                    )}
                </div>
                <h1>{post.title}</h1>
                    {getText(post.desc)}
            </div>
            <Menu cat={post.cat}/>
        </div>
    )
}

export default Single;