import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { jwtDecode } from "jwt-decode"



interface TokenPayload {
    user: string;
}

const HeaderPost = ({ userName, userImg, createAt, userPostId, postId }: { userName: string, userImg: string, createAt: string, userPostId: string, postId: string }) => {

    
        const {user : loggedUserId} = jwtDecode<TokenPayload>(localStorage.getItem("token")!);
    
    


    function deletePost() {
        return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({
                queryKey: ["userPosts"]
            })

        },
        onError: (error) => {
            console.log(error);

        }
    })

    return (
        <div className='flex justify-between items-center'>
            <div className='flex '>

                {/* avatar */}
                <div className="avatar me-3 rounded-full">
                    <div className="w-12 rounded-full">
                        <img className='rounded-full' src={userImg} />
                    </div>
                </div>


                {/* name, date */}
                <div>
                    <h4>{userName}</h4>
                    <p> {createAt}</p>
                </div>
            </div>
            {/* icon */}

            {loggedUserId === userPostId ? <details className="dropdown dropdown-right">
                <summary className="btn m-1 bg-slate-700 border-0"><i className="fa-solid fa-ellipsis"></i></summary>
                <ul className="menu dropdown-content bg-slate-700 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                        <button onClick={() => mutate()}>
                            {isPending ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Delete"}
                        </button>

                    </li>

                    <li><button>Update</button></li>
                </ul>
            </details> : ""}



        </div>
    )
}

export default HeaderPost
