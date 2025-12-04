import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import  { useRef, useState } from 'react'

const AddPost = () => {

    const queryClient = useQueryClient()

    const [viewImage, setViewImage] = useState<string | null>(null)
    const [image, setImage] = useState< File | string>("")

    const postBody = useRef<HTMLTextAreaElement>(null)
    const postImage = useRef<HTMLInputElement>(null)

    function addPost() {

        const formData = new FormData

        if (postBody.current && postBody.current.value.trim() !== "") {
            formData.append("body", postBody.current.value);
        }

        if (image != "") {
            formData.append("image", image)

        }

        return axios.post("https://linked-posts.routemisr.com/posts", formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }

    const { isPending, mutate } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            if (postBody.current) {
                postBody.current.value = "";
            }

            handleClose()
            const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
            modal?.close();
            queryClient.invalidateQueries({
                queryKey: ["userPosts"]
            })


        },
        onError: (error) => {
            console.log(error);

        }
    })

    function handleImage() {
        if (postImage.current?.files && postImage.current.files[0]) {
            const src = URL.createObjectURL(postImage.current.files[0])
            setImage(postImage.current.files[0])
            setViewImage(src)
        }

    }

    function handleClose() {

        setViewImage(null)
        if (postImage.current) {
            postImage.current.value = "";
        }

        setImage("")

    }


    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-primary" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}>Add Post</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Post</h3>

                    {/* body post */}

                    <textarea ref={postBody} placeholder="Write your thoughts here..." className="textarea textarea-primary mt-10 w-full"></textarea>


                    {/* image post */}

                    {viewImage ? (<div className='mt-5'>
                        <i onClick={handleClose} className='fa-solid fa-xmark text-white ms-auto cursor-pointer !block mb-2'></i>
                        <img src={viewImage} className='w-full' alt="" />
                    </div>
                    ) : (
                        <div className="flex items-center justify-center w-full mt-5 ">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                                <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input onChange={handleImage} ref={postImage} id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    )}





                    <button onClick={()=>mutate()} className='btn btn-primary mt-3'>
                        {isPending ? <i className='fas fa-spinner fa-spin text-white'></i> : "Add Post"}
                    </button>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddPost
