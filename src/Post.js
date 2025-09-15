import React, { useEffect, useState } from "react";
import Api from "./Api";
import 'remixicon/fonts/remixicon.css'


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
        
        <>
            <div className="container mx-auto px-2 sm:px-32">
            <h1 className="text-3xl font-bold underline">Post</h1>
           
           <div className="flex md:flex-none">

           <div className="mx-4 md:mx-none">
            <form onSubmit={handlesubmit} className="flex flex-col">
                <div className="w-80 my-2 flex flex-col">
                <label className="font-black">Tiltle</label>
             <input 
             className="border-solid border-2 border-indigo-300 rounded"
             type="text"
             placeholder="Enter Title"
             value={form.title}
             name= "title"
             onChange={handleInput}
             />
             </div>
             <div className="w-80 my-2 flex flex-col">
             <label className="font-black">Content</label>
             <input 
             className="border-solid border-2 border-indigo-300 rounded"
             type="text"
             placeholder="Enter Content"
             value={form.content}
             name="content"
             onChange={handleInput}
             />
             </div>
             <button type="submit" className="border-solid border-2 border-lime-600 w-32 rounded bg-lime-600 text-white">
                {edit ? "Update Post":"Add Post"}
            </button>


            </form>
            </div>

            <div className="mx-4">

           <table className="table w-full table-fixed border">
            <thead>
            <tr>
                <th className="text-center">Sr. No</th>
                <th className="text-center">Title</th>
                <th className="text-center">Content</th>
                <th className="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
             {posts.map((list,index)=>(
              <tr key={index}>
                <td className="text-center">{index+1}</td>
                <td className="text-center">{list.title}</td>
                <td className="text-center">{list.content}</td>
                <td className="text-center"><button onClick={()=>handleDelete(list.id)}>
                    <i class="ri-delete-bin-6-line"></i></button><button onClick={()=>handleEdit(list)}><i className="ri-edit-box-fill"></i></button>
                </td>
              </tr>
             ))}
             </tbody>
            
           </table>
            </div>

            </div>

            </div>
        </>
    )

}

export default Post