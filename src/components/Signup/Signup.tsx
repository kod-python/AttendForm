"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ImSpinner9 } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";





const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://172.20.10.3:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await fetch("http://172.20.10.3:3000/api/signup");
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPeople();
  }, []);

  return (
    <div className="">
   
      <form
        onSubmit={handleSubmit}
        className="container mx-auto grid space-y-2 border p-10 m-4 shadow-md shadow-black"
      >
        <h1 className="text-center font-bold text-2xl text-gray-500">
          SIGNUP PAGE
        </h1>
        <label htmlFor="username" className="text-gray-500">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={data.username}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />

        <label htmlFor="email" className="text-gray-500">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />

        <label htmlFor="password" className="text-gray-500">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="************"
          value={data.password}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />

        <button
          type="submit"
          className="py-2 px-4 text-gray-500 bg-blue-100 hover:bg-black hover:text-white"
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

          Sign Up
</div>

        </button>
        <p className="text-gray-500">
          If you are already signed up, please login here{" "}
          <Link href="/logPage" className="underline text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
