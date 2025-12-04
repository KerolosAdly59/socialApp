
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";



const Login = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { insertUserToken } = useContext(authContext)!  


  const navegate = useNavigate()


  const schemaRegister = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(5, "Min length is 5").max(10, "Max length is 10").regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain upper, lower, number & special char"),

  })


  type UserRegisterSchema = z.infer<typeof schemaRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signUp(values: UserRegisterSchema) {


    setIsLoading(true)

    try {

      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", values);


      localStorage.setItem("token", data.token)
      insertUserToken(data.token);
      toast.success(data.message, {
        position: "top-center",

      }
      )
      setIsLoading(false)

      navegate("/")

    } catch (error : unknown) {
      const e = error as AxiosError<any>
      toast.error(e.response?.data.error, {
        position: "top-center",

      }
      )
      setIsLoading(false)
    }

  }

  return (
    <section className="my-10 p-10 mx-auto w-1/2 shadow-2xl shadow-blue-500 dark:shadow-white/20">
      <h1 className="mb-12 font-bold text-center text-3xl">Register Now</h1>

      <form onSubmit={handleSubmit(signUp)}>


        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="input input-primary w-full mb-4"
          {...register("email")}
        />
        {errors?.email && touchedFields?.email && (
          <p className="mb-3 text-red-500">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="input input-primary w-full mb-4"
          {...register("password")}
        />
        {errors?.password && touchedFields?.password && (
          <p className="mb-3 text-red-500">{errors.password.message}</p>
        )}


        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          {isLoading ? <i className=" fa-solid fa-spinner fa-spin text-white "></i> : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
