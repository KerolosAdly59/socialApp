
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Register = () => {

  const [isLoading, setIsLoading] = useState(false)


  const navegate = useNavigate()


  const schemaRegister = z.object({
    name: z.string().min(3, "Min length is 3").max(20, "Max length is 20"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(8, "Min length is 5").max(10, "Max length is 10").regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain upper, lower, number & special char"),
    rePassword: z.string().min(8, "Min length is 5").max(10, "Max length is 10").regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain upper, lower, number & special char"),
    dateOfBirth: z.string().refine((value) => {
      const currentYear = new Date().getFullYear();
      const userYear = new Date(value).getFullYear();
      return currentYear - userYear >= 18;
    }, "You must be 18 years or older"),
    gender: z.enum(["male", "female"]),
  })
    .refine((values) => values.password === values.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  type UserRegisterSchema = z.infer<typeof schemaRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: new Date().toISOString().slice(0, 10),
      gender: "male",
    },
  });

  async function signUp(values: UserRegisterSchema) {


    setIsLoading(true)

    try {

      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", values);

      toast.success(data.message, {
        position: "top-center",

      }
      )
      setIsLoading(false)

      navegate("/login")

    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        toast.error(e.response.data.error, {
           position: "top-center" });
      }
      
      setIsLoading(false)
    }

  }

  return (
    <section className="my-10 p-10 mx-auto w-1/2 shadow-2xl shadow-blue-500 dark:shadow-white/20">
      <h1 className="mb-12 font-bold text-center text-3xl">Register Now</h1>

      <form onSubmit={handleSubmit(signUp)}>
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="input input-primary w-full mb-4"
          {...register("name")}
        />
        {errors?.name && touchedFields?.name && (
          <p className="mb-3 text-red-500">{errors.name.message}</p>
        )}

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

        {/* RePassword */}
        <input
          type="password"
          placeholder="Repassword"
          id="rePassword"
          className="input input-primary w-full mb-4"
          {...register("rePassword")}
        />
        {errors?.rePassword && touchedFields?.rePassword && (
          <p className="mb-3 text-red-500">{errors.rePassword.message}</p>
        )}

        {/* Date of Birth */}
        <input
          type="date"
          placeholder="Date of Birth"
          id="dateOfBirth"
          className="input input-primary w-full mb-4"
          {...register("dateOfBirth")}
        />
        {errors?.dateOfBirth && touchedFields?.dateOfBirth && (
          <p className="mb-3 text-red-500">{errors.dateOfBirth.message}</p>
        )}

        {/* Gender */}
        <div className="mb-4">
          <input
            type="radio"
            id="male"
            value="male"
            {...register("gender")}
            className="radio radio-primary"
            defaultChecked
          />
          <label htmlFor="male" className="ms-2 me-10">
            Male
          </label>

          <input
            type="radio"
            id="female"
            value="female"
            {...register("gender")}
            className="radio radio-primary"
          />
          <label htmlFor="female" className="ms-2">
            Female
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          {isLoading ? <i className=" fa-solid fa-spinner fa-spin text-white "></i> : "Register"}
        </button>
      </form>
    </section>
  );
};

export default Register;
