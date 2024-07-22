"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [data, setData] = useState({
   
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:8000/api/authen/${data}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
       
        router.push("/");
      } else {
    
        setError(responseData.message || "Invalid login credentials");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="container mx-auto grid space-y-2 border p-10 m-4 shadow-md shadow-black"
      >
        <h1 className="text-center font-bold text-2xl text-gray-500">
          LOGIN PAGE
        </h1>
        <label htmlFor="firstName" className="text-gray-500">
          email
        </label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />

        <label htmlFor="email" className="text-gray-500">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="py-2 px-4 text-gray-500 bg-blue-100 hover:bg-black hover:text-white"
        >
          <div className="flex justify-center">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <p>Loading ....</p>
              </div>
            ) : (
              <p>Login</p>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default Login;
