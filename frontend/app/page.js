"use client";

import React, { useState, useEffect } from "react";
import API from "../utils/api";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await API.post("/tasks/", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await API.post(`/tasks/${id}/toggle/`);
    fetchTasks();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-14 px-6">
 
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-xl">
        Task Manager
      </h1>

    
      <form
        onSubmit={addTask}
        className="max-w-xl mx-auto flex gap-3 items-center mb-14"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write a new task..."
          className="w-full px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none text-white shadow-lg focus:shadow-blue-500/40 transition-all"
        />

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 shadow-lg font-semibold transition-all active:scale-95"
        >
          Add
        </button>
      </form>

     
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </main>
  );
}
