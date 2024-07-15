"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Modal from "../Modal/Modal";
// import { MdDeleteForever } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { FaSpinner } from "react-icons/fa";

const TaskManager: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    course: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<any[]>([]);

  const handleClose = () => {
    setShowModal(false);
    setInputValue("");
    setEditingTaskIndex(null);
  };

  const handleButton: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editingTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingTaskIndex ? inputValue : task
      );
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      setTasks((tasks) => [...tasks, inputValue]);
    }
    setInputValue("");
    setShowModal(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/attendances/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      setPeople((prevPeople) => [...prevPeople, responseData]);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    const personToEdit = people[index];
    setEditingTaskIndex(index);
    setData(personToEdit);
    setShowModal(true);
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/attendances/${data.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

      // const response = await fetch(`https://kodsnake.pythonanywhere.com/api/attendances/${data.id}/`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === responseData.id ? responseData : person
        )
      );
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.error("Error updating form:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    const personToDelete = people[index];

    try {
      await fetch(`http://localhost:8000/api/attendances/${personToDelete.id}/`, {
        method: "DELETE",
      });
      // await fetch(`https://kodsnake.pythonanywhere.com/api/attendances/${personToDelete.id}/`, {
      //   method: "DELETE",
      // });

      setPeople((prevPeople) =>
        prevPeople.filter((_, personIndex) => personIndex !== index)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/attendances/");
        // const response = await fetch("https://kodsnake.pythonanywhere.com/api/attendances/");
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPeople();
  }, []);

  return (
    <div>
      <h1 className="text-[2rem] text-center text-gray-500 pb-[200px]">
        Attendance Form Page
      </h1>

      <div className="mt-[-200px] ">
        <div className="">
          {people.map((person, index) => (
            <li key={person.id} className="flex justify-between">
              <table>
                <thead>
                  <tr className="flex items-center gap-40 p-[20px]">
                    <th>ID</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>COURSE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex items-center gap-40 p-[20px]">
                    <td className="flex items-center gap-40 p-[20px]">{person.id}</td>
                    <td className="flex items-center gap-40 p-[20px]">{person.firstName}</td>
                    <td className="flex items-center gap-40 p-[20px]">{person.lastName}</td>
                    <td className="flex items-center gap-40 p-[20px]">{person.email}</td>
                    <td className="flex items-center gap-40 p-[20px]">{person.course}</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex items-center gap-4 pl-[20px]">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-green-500"
                >

                  {/* <FaEdit size={30} /> */}
                  EDIT
                </button>
          
     
                <button
                  onClick={() => handleDelete(index)}
                  className="text-green-500"
                >

<div className="flex justify-center">


{isLoading ? (
        <div className="flex items-center gap-3">
          {/* <span className="animate-spin"><FaSpinner  /></span> */}
          
          {/* <p>Deleting ....<MdDeleteForever size={30} /></p> */}
        </div>
      ) : (
        <div>
         
          <p></p>
        </div>
      )}

{/* <MdDeleteForever size={30}/> */}
DELETE
</div>

                  
                </button>
              </div>
            </li>
          ))}
          <div className="mt-[90px] flex justify-center">
            <button
              className="btn py-2 px-5 bg-blue-500 text-white rounded"
              onClick={() => setShowModal(true)}
            >
              ADD MEMBER
            </button>
          </div>
        </div>
      </div>

      <Modal isVisible={showModal} onClose={handleClose}>
        <h1 className="text-[2rem] text-center">
          {editingTaskIndex !== null ? "Edit Task" : "Attendance Form"}
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-3"
          onSubmit={editingTaskIndex !== null ? handleUpdate : handleSubmit}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border outline-blue-500 border-blue-500 rounded p-[10px]"
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border outline-blue-500 border-blue-500 rounded p-[10px]"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="border outline-blue-500 border-blue-500 rounded p-[10px]"
          />

          <label htmlFor="course">Course</label>
          <input
            type="text"
            name="course"
            value={data.course}
            onChange={handleChange}
            placeholder="Course"
            className="border outline-blue-500 border-blue-500 rounded p-[10px]"
          />

          <button type="submit" className="btn border-1">
            {editingTaskIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TaskManager;



































