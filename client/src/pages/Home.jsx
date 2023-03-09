import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {get} from "../axios/request.js"

const Home = () => {

    const[posts, setPosts] = useState([])

    const cat = useLocation().search
    const navigate = useNavigate()

    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html,"text/html")
      return doc.body.textContent
    }


    useEffect(() => {
      const fetchData = async () => {
        try{
          const res = await get(`/posts${cat}`);
          setPosts(res)

        }catch(e){
          console.log(e)
        }
      }
      fetchData()
    },[cat])

    return (
        <div className='home'>
            <div className='posts'>
                {posts.map(post => (
                    <div className='post' key={post.id}>
                        <div className='img'>
                            <img src={`./upload/${post.img}`} alt=""/>
                        </div>
                        <div className="content">
                            <Link to={`/post/${post.id}`} className="link">
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <button onClick={()=>{navigate(`/post/${post.id}`)}}>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home