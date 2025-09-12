import React, { useEffect, useState } from "react";
import Api from "./Api";


const Post = () =>{

    const model = {
        title:'',
        content:'',

    }
    
    const[posts,setPosts] = useState([]);
    const[form,setForm] = useState(model);
    const[edit,setEdit] = useState(null);

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
      try{

         if(edit)
         {
             const response = await Api.post(`/edit-post/${edit}`,form);
              console.log("Response:",response.data)
         }else{
          const response = await Api.post("/store-post",form);
           console.log("Response:",response.data)
         }

    
      setForm(model);
      setEdit(null);
      fetchpost();
      }catch(error)
      {
        console.error("Error response:",error.response?.data)
      }


    };

    const handleDelete = async (id) =>{
        try{

        const response = await Api.delete(`/delete-post/${id}`)
        console.log("Response:",response.data);
        fetchpost();
        }catch(error)
        {
            console.error("Error response:", error.response?.data);
        }
    };

    const handleEdit = async (post) =>{
        try{

           
    
              setForm(post)
             setEdit(post.id)


        }catch(error)
        {
            console.error("Error response:", error.response?.data);
        }
    }



    return(
        <div>
            <div>
            <h1 className="text-3xl font-bold underline">Post</h1>
           <div>
            <form onSubmit={handlesubmit}>
             <input 
             className="border-solid border-2 border-indigo-300"
             type="text"
             placeholder="title"
             value={form.title}
             name= "title"
             onChange={handleInput}
             />
             
             <input 
             className="border-solid border-2 border-indigo-300"
             type="text"
             placeholder="content"
             value={form.content}
             name="content"
             onChange={handleInput}
             />
             <br/>
             <button type="submit">{edit ? "Update Post":"Add Post"}</button>


            </form>
            </div>

            <ul>
                {posts.map((list,index)=>(
                <li key={index}>{index+1}.){list.title} : {list.content} <button onClick={()=>handleDelete(list.id)}>Delete</button><button onClick={()=>handleEdit(list)}>Edit</button></li>
                ))
                }
            </ul>
            </div>
        </div>
    )

}

export default Post