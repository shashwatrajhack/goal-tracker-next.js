"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Types for Goal and Milestone
type Goal = {
  id: number;
  title: string;
  progress: number;
  milestones: string[];
  comments: string[];
};

// Sample mock chart data
const mockChartData = [
  { name: 'Week 1', progress: 30 },
  { name: 'Week 2', progress: 50 },
  { name: 'Week 3', progress: 60 },
  { name: 'Week 4', progress: 80 },
];

// Goal Card Component
const GoalCard = ({ goal }: { goal: Goal }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{goal.title}</h2>
      <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <p className="text-lg text-gray-800 mb-4">{goal.progress}% completed</p>
      <div className="text-base text-gray-800 mb-4 leading-relaxed">
        <strong>Milestones:</strong>
        <ul className="list-disc list-inside">
          {goal.milestones.map((milestone, index) => (
            <li key={index}>✔️ {milestone}</li>
          ))}
        </ul>
      </div>
      <div className="text-base text-gray-800 leading-relaxed">
        <strong>Comments:</strong>
        <ul className="list-disc list-inside">
          {goal.comments.map((comment, index) => (
            <li key={index}>📝 {comment}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Dashboard Component
const Dashboard = ({ goals }: { goals: Goal[] }) => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">My Goals Dashboard</h1>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#2563eb"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Goal Form Component
const GoalForm = ({ addGoal }: { addGoal: (goal: Goal) => void }) => {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [milestones, setMilestones] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGoal: Goal = {
      id: Date.now(),
      title,
      progress,
      milestones: milestones.split(',').map((m) => m.trim()),
      comments: comments.split(',').map((c) => c.trim()),
    };

    addGoal(newGoal);
    setTitle('');
    setProgress(0);
    setMilestones('');
    setComments('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a New Goal</h2>
      <input
        type="text"
        placeholder="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 border rounded text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        placeholder="Progress %"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full mb-4 p-3 border rounded text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="Milestones (comma separated)"
        value={milestones}
        onChange={(e) => setMilestones(e.target.value)}
        className="w-full mb-4 p-3 border rounded text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Comments (comma separated)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="w-full mb-4 p-3 border rounded text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded"
      >
        Add Goal
      </button>
    </motion.form>
  );
};

// Main Page Component
const Page = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (newGoal: Goal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white">
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline font-medium">Home</a></li>
          <li><a href="#dashboard" className="hover:underline font-medium">Dashboard</a></li>
          <li><a href="#" className="hover:underline font-medium">Settings</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        <GoalForm addGoal={addGoal} />
        <Dashboard goals={goals} />
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 p-4 text-white text-center">
        <p>&copy; 2025 My Goal Tracker</p>
      </footer>
    </div>
  );
};

export default Page;
