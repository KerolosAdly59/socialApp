import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AddPost from '../AddPost/AddPost';
import PostComp from '../PostComp/PostComp';
import type { Post } from '../../Types/posts.type';
import { Helmet } from 'react-helmet';

interface TokenPayload {
    user: string;
}

const Profile = () => {

  const {user : loggedUserId} = jwtDecode<TokenPayload>(localStorage.getItem("token")!)


  function getUserPosts() {

    return axios.get(`https://linked-posts.routemisr.com/users/${loggedUserId}/posts`,{
      headers:{
        token : localStorage.getItem("token")
      }
    })
    
  }

  const {isLoading,data} = useQuery({
    queryKey:["userPosts"] ,
    queryFn:getUserPosts,
    
  })

  

  
  if (isLoading) {
    return (
    <div className='h-screen flex justify-center items-center'>
      <i className='text-white fa-solid fa-spinner fa-spin fa-7x'></i>
    </div>
    )
  }

  return (
<>
   
      <section className='w-full md:w-2/3 lg:w-1/2 mx-auto p-5 my-4'>

        <Helmet>
                      <title>profile {data?.data?.posts[0]?.user?.name ||""}</title>
                  </Helmet>
      <div className='mb-5 text-center'>
        <AddPost />
      </div>

        {data?.data?.posts?.length > 0 ? data?.data?.posts.toReversed().map( function(post:Post , idx:number){return <PostComp key={idx} post={post} isPostDetails={false} />}):<p className="text-center text-white text-4xl my-28">No posts yet.</p>}
      </section>
      </>
  )
}

export default Profile
