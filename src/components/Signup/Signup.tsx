"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { ImSpinner9 } from "react-icons/im";
// import { FaSpinner } from "react-icons/fa";





const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
  });


  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // const response = await fetch("http://localhost:8000/api/signup/", {
        const response = await fetch("https://rattleviper.pythonanywhere.com/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

     
      if (!response.ok){
        throw new Error(`HTTP error status: ${response.status}`);

      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error){
        console.error(responseData.error);
        alert(responseData.error)
      }else{
        router.push('/LoginPage')
      }

    


      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('A user is already using the same email')
      setError('A user is already using the same email')
      setIsLoading(false);
    }

  
  };

  
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await fetch("");
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
          firstName
        </label>
        <input
          type="text"
          name="firstName"
          placeholder="firstName"
          value={data.firstName}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />

       <label htmlFor="username" className="text-gray-500">
          lastName
        </label>
        <input
          type="text"
          name="lastName"
          placeholder="lastName"
          value={data.lastName}
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

        <div className="relative">

        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          placeholder="************"
          value={data.password}
          onChange={handleChange}
          className="border p-2 rounded w-full outline-blue-100"
        />
          <button  type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute  top-2">
            {passwordVisible ? "Hide" : "Show"}
          </button>

        </div>
    

        <button
          type="submit"
          className="py-2 px-4 text-gray-500 bg-blue-100 hover:bg-black hover:text-white"
        >

<div className="flex justify-center">


{isLoading ? (
        <div className="flex items-center gap-3">
          {/* <span className="animate-spin"><FaSpinner  /></span> */}
          
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

        {error && <p className="text-red-500">{error}</p>}
        <p className="text-gray-500">
          If you are already signed up, please login here{" "}
          <Link href="/LoginPage" className="underline text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
