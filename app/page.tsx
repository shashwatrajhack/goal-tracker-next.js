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
      <h2 className="text-xl font-semibold mb-2">{goal.title}</h2>
      <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <p className="text-gray-700 mb-4">{goal.progress}% completed</p>
      <div className="text-sm text-gray-600 mb-4">
        <strong>Milestones:</strong>
        <ul>
          {goal.milestones.map((milestone, index) => (
            <li key={index}>✔️ {milestone}</li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-gray-600">
        <strong>Comments:</strong>
        <ul>
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
      <h1 className="text-4xl font-bold mb-6">My Goals Dashboard</h1>
      
      {/* Goal Cards */}
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}

      {/* Chart */}
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
            stroke="#8884d8"
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
      <h2 className="text-xl font-semibold mb-4">Add a New Goal</h2>
      <input
        type="text"
        placeholder="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Progress %"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Milestones (comma separated)"
        value={milestones}
        onChange={(e) => setMilestones(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Comments (comma separated)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
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
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white">
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#dashboard" className="hover:underline">Dashboard</a></li>
          <li><a href="#" className="hover:underline">Settings</a></li>
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
