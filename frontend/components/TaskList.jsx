"use client";

import React from "react";

export default function TaskList({ tasks, onToggle }) {
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-yellow-400 to-yellow-600",
  ];

  return (
    <div className="max-w-3xl mx-auto grid gap-5">
      {tasks.map((task, index) => {
        const gradient = gradients[index % gradients.length];

        return (
          <div
            key={task.id}
            className={`p-5 rounded-2xl bg-gradient-to-r ${gradient} shadow-xl text-white flex justify-between items-center transform hover:scale-[1.02] transition-all`}
          >
            <div>
              <h3 className="font-bold text-xl">{task.title}</h3>
              <p
                className={`text-sm mt-1 ${
                  task.status === "completed"
                    ? "opacity-80 line-through"
                    : "opacity-100"
                }`}
              >
                {task.status.toUpperCase()}
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 accent-white cursor-pointer"
              />
              <span className="text-sm font-semibold">Done</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
