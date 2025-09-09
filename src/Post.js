import React, { useEffect, useState } from "react";
import Api from "./Api";


const Post = () =>{

    const model = {
        title:'',
        content:'',

    }
    
    const[posts,setPosts] = useState([]);
    const[form,setForm] = useState(model);

    useEffect(()=>{
       fetchpost();
    },[])


    const fetchpost = async () =>{
     try{
     let res = await Api.get("/posts");
     setPosts(res.data);
     }catch(e)
    {
        console.log(e)
    }

    };


    const handleInput = async (e) =>{
    const input = e.target
    const value = input.value
    const key = input.name

    setForm({...form,
        
        [key]:value})

    }

    const handlesubmit = async (e) =>{

      e.preventDefault();
      await Api.post("/store-post",form);
      setForm(model);
      fetchpost();


    };



    return(
        <div>
            <h1>Post</h1>
            <form onSubmit={handlesubmit}>
             <input 
             type="text"
             placeholder="title"
             value={form.title}
             name= "title"
             onChange={handleInput}
             />
             <br/>
             <input 
             type="text"
             placeholder="content"
             value={form.content}
             name="content"
             onChange={handleInput}
             />
             <br/>
             <button type="submit">Add Posts</button>


            </form>

            <ul>
                {posts.map((list,index)=>(
                <li key={index}>{index+1}.){list.title} : {list.content}</li>
                ))
                }
            </ul>
        </div>
    )

}

export default Post