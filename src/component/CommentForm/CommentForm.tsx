import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const CommentForm = ({ id }: { id: string }) => {

    const [content, setContent] = useState("")





    const queryClient = useQueryClient()


    function handleKeyEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            mutate()
        }
    }

    function createComment() {
        const values = {
            "content": content,
            "post": id
        }
        return axios.post("https://linked-posts.routemisr.com/comments", values, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }
    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onSuccess: (data) => {
            toast.success(data.data.message)
            setContent("")
            queryClient.invalidateQueries({
                queryKey: ["postDetails", id],
            })


        },
        onError: (error: unknown) => {
            const err = error as AxiosError<any>;
            toast.error(err.response?.data?.error);


        }

    })
    return (
        <div className="join mt-4 !w-full">
            <div className='!w-full'>
                <label className="input !w-full join-item">

                    <input type="text" className='!w-full' placeholder="Enter Your Comments" required
                        value={content}
                        onChange={(e) => { setContent(e.target.value) }}
                        onKeyDown={handleKeyEnter}

                    />
                </label>
                <div className="validator-hint hidden ">Enter valid email address</div>
            </div>
            <button onClick={() => mutate()} className="btn btn-primary join-item">
                {isPending ? <i className='fas fa-spinner fa-spin text-white'></i> : <i className="fa-solid fa-paper-plane text-white"></i>}
            </button>
        </div>
    )
}

export default CommentForm
