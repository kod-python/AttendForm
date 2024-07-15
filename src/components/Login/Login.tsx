"use client";
import React from "react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({
    username: "",

    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setisLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setisLoading(false)
  };

  return (
    <div>


      <form
        onSubmit={handleSubmit}
        className="container mx-auto grid space-y-2 border p-[40px] m-[10px] shadow-md shadow-black"
      >
        <h1 className="text-center font-bold text-[2rem] text-gray-500">LOGIN PAGE</h1>
        <label htmlFor="" className="text-gray-500">Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={data.username}
          onChange={handleChange}
          className="border p-[3px] pl-[10px] rounded w-full outline-blue-100"
        />

        <label htmlFor="" className="text-gray-500">Password</label>
        <input
          type="text"
          name="password"
          placeholder="*******"
          value={data.password}
          onChange={handleChange}
          className="border p-[3px] pl-[10px] rounded w-full  outline-blue-100"
        />

        <button
          type="submit"
          className="py-1 px-4 text-gray-500  bg-blue-100 hover:bg-black hover:text-white"
        >


<div className="flex justify-center">


{isLoading ? (
        <div className="flex items-center gap-3">
          <span className="animate-spin"><FaSpinner  /></span>
          
          <p>Loading ....</p>
        </div>
      ) : (
        <div>
         
          <p></p>
        </div>
      )}

      Login
</div>



          
        </button>
        <p className="text-gray-500">
          PLease Signup here{" "}
          <Link href="/" className="underline text-blue-400">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
