'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { nanoid } from 'nanoid';

const goalsData = [
  { id: nanoid(), name: 'Goal 1', progress: 80, description: 'Complete coding challenges for the week.', milestones: ['Start working', '50% completed', 'Goal achieved'] },
  { id: nanoid(), name: 'Goal 2', progress: 40, description: 'Read a book and summarize chapters.', milestones: ['Read 2 chapters', '50% completed'] },
  { id: nanoid(), name: 'Goal 3', progress: 60, description: 'Build a personal website.', milestones: ['Design homepage', '50% completed', 'Finish project'] }
];

const commentsData = [
  { goalId: '1', user: 'Alice', comment: 'Great progress! Keep it up.' },
  { goalId: '2', user: 'Bob', comment: 'I like how you are managing your time.' },
  { goalId: '3', user: 'Charlie', comment: 'Looking good, add some more features!' }
];

const ClientOnlyChart = () => {
  const data = [
    { name: 'Completed', value: 80 },
    { name: 'Remaining', value: 20 }
  ];
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const GoalCard = ({ goal }: any) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md w-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-2">{goal.name}</h3>
      <p className="text-gray-500 mb-4">{goal.description}</p>

      <ClientOnlyChart />

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress: {goal.progress}%</span>
          <div className="flex items-center space-x-1">
            {goal.milestones.map((milestone, index) => (
              <span key={index} className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {milestone}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-lg font-medium">Comments:</h4>
          <ul className="space-y-2">
            {commentsData
              .filter((comment) => comment.goalId === goal.id)
              .map((comment) => (
                <li key={comment.user} className="text-sm text-gray-700">
                  <strong>{comment.user}:</strong> {comment.comment}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Goal Tracker</h1>
        <button onClick={toggleModal} className="bg-blue-700 px-4 py-2 rounded-md">
          Settings
        </button>
      </header>

      <main className="flex-1 p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsData.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </main>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p>Configure your preferences here...</p>
            <button onClick={toggleModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md">
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="bg-blue-600 text-white p-4 mt-8">
        <p className="text-center">© 2025 Goal Tracker</p>
      </footer>
    </div>
  );
};

export default HomePage;
