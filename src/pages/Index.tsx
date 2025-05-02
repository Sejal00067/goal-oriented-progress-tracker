
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Check, Star, Trophy, Flag, Calendar, Calendar as CalendarIcon, CheckCircle, Circle } from 'lucide-react';

const Index = () => {
  // Sample data for goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Launch New Product",
      description: "Complete all steps for the Q2 product launch",
      progress: 65,
      category: "Business",
      dueDate: "2025-06-15",
      createdAt: "2025-01-10",
      owner: {
        name: "Alex Morgan",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      teammates: [
        { name: "Jamie Liu", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
        { name: "Carlos Rodriguez", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      ],
      milestones: [
        { id: 101, title: "Market Research", completed: true },
        { id: 102, title: "Prototype Development", completed: true },
        { id: 103, title: "User Testing", completed: true },
        { id: 104, title: "Marketing Materials", completed: false },
        { id: 105, title: "Launch Event", completed: false },
      ],
      comments: [
        {
          id: 201,
          user: { name: "Jamie Liu", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
          text: "The prototype looks amazing! I think we're ahead of schedule.",
          timestamp: "2025-03-24T14:30:00Z"
        },
        {
          id: 202,
          user: { name: "Carlos Rodriguez", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
          text: "I've completed the user testing report. The feedback is mostly positive!",
          timestamp: "2025-04-02T09:15:00Z"
        }
      ]
    },
    {
      id: 2,
      title: "Run Half-Marathon",
      description: "Train and complete the city half-marathon",
      progress: 40,
      category: "Personal",
      dueDate: "2025-07-20",
      createdAt: "2025-02-05",
      owner: {
        name: "Taylor Kim",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      teammates: [],
      milestones: [
        { id: 201, title: "5K Training Complete", completed: true },
        { id: 202, title: "10K Training Complete", completed: true },
        { id: 203, title: "15K Training Complete", completed: false },
        { id: 204, title: "Race Day Prep", completed: false },
      ],
      comments: [
        {
          id: 301,
          user: { name: "Taylor Kim", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
          text: "Completed my first 10K run today! Feeling great about progress.",
          timestamp: "2025-03-15T16:45:00Z"
        }
      ]
    },
    {
      id: 3,
      title: "Website Redesign",
      description: "Complete full redesign of company website",
      progress: 85,
      category: "Work",
      dueDate: "2025-05-30",
      createdAt: "2025-01-20",
      owner: {
        name: "Jordan Smith",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      },
      teammates: [
        { name: "Riley Johnson", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
        { name: "Blake Thompson", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
      ],
      milestones: [
        { id: 301, title: "Design Approval", completed: true },
        { id: 302, title: "Frontend Development", completed: true },
        { id: 303, title: "Backend Integration", completed: true },
        { id: 304, title: "Content Migration", completed: true },
        { id: 305, title: "QA Testing", completed: false },
        { id: 306, title: "Launch", completed: false },
      ],
      comments: [
        {
          id: 401,
          user: { name: "Riley Johnson", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
          text: "All pages are now responsive. Ready for final QA testing!",
          timestamp: "2025-04-10T11:20:00Z"
        },
        {
          id: 402,
          user: { name: "Blake Thompson", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
          text: "Content migration completed successfully. Just a few small tweaks needed.",
          timestamp: "2025-04-12T13:45:00Z"
        }
      ]
    },
    {
      id: 4,
      title: "Learn Spanish",
      description: "Reach conversational fluency in Spanish",
      progress: 25,
      category: "Education",
      dueDate: "2025-12-31",
      createdAt: "2025-01-01",
      owner: {
        name: "Morgan Reed",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      teammates: [],
      milestones: [
        { id: 401, title: "Master Basic Vocabulary", completed: true },
        { id: 402, title: "Complete Beginner Course", completed: false },
        { id: 403, title: "Hold Basic Conversations", completed: false },
        { id: 404, title: "Read Simple Texts", completed: false },
        { id: 405, title: "Watch Shows Without Subtitles", completed: false },
      ],
      comments: [
        {
          id: 501,
          user: { name: "Morgan Reed", avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
          text: "Completed my first full conversation with a native speaker today!",
          timestamp: "2025-02-28T19:30:00Z"
        }
      ]
    }
  ]);

  // Activity data for charts
  const activityData = [
    { name: 'Jan', activity: 65 },
    { name: 'Feb', activity: 59 },
    { name: 'Mar', activity: 80 },
    { name: 'Apr', activity: 81 },
    { name: 'May', activity: 56 },
  ];

  const categoryData = [
    { name: 'Work', value: 40 },
    { name: 'Personal', value: 30 },
    { name: 'Education', value: 20 },
    { name: 'Business', value: 10 },
  ];

  const COLORS = ['#6366F1', '#22D3EE', '#F97316', '#8B5CF6'];

  // State management
  const [activeGoal, setActiveGoal] = useState(null);
  const [showGoalDetails, setShowGoalDetails] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [view, setView] = useState('dashboard'); // dashboard, list, calendar
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Work',
    dueDate: '',
    milestones: [{ title: '', completed: false }]
  });

  // Handle viewing goal details
  const handleViewGoal = (goal) => {
    setActiveGoal(goal);
    setShowGoalDetails(true);
  };

  // Handle adding comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const updatedGoals = goals.map(g => {
      if (g.id === activeGoal.id) {
        return {
          ...g,
          comments: [
            ...g.comments,
            {
              id: Date.now(),
              user: {
                name: "You",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              text: newComment,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return g;
    });
    
    setGoals(updatedGoals);
    setActiveGoal(updatedGoals.find(g => g.id === activeGoal.id));
    setNewComment('');
  };

  // Handle milestone toggle
  const handleToggleMilestone = (goalId, milestoneId) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        // Calculate new progress
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return { 
          ...goal, 
          milestones: updatedMilestones,
          progress
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setActiveGoal(updatedGoals.find(g => g.id === goalId));
  };

  // Handle adding a new goal
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.dueDate) return;
    
    const newGoalObj = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
      owner: {
        name: "You",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      teammates: [],
      comments: [],
      milestones: newGoal.milestones.map((milestone, index) => ({
        id: Date.now() + index,
        title: milestone.title,
        completed: false
      }))
    };
    
    setGoals([...goals, newGoalObj]);
    setShowNewGoalModal(false);
    setNewGoal({
      title: '',
      description: '',
      category: 'Work',
      dueDate: '',
      milestones: [{ title: '', completed: false }]
    });
  };

  // Add milestone field to new goal form
  const addMilestoneField = () => {
    setNewGoal({
      ...newGoal,
      milestones: [...newGoal.milestones, { title: '', completed: false }]
    });
  };

  // Update milestone in new goal form
  const updateMilestone = (index, value) => {
    const updatedMilestones = [...newGoal.milestones];
    updatedMilestones[index].title = value;
    setNewGoal({
      ...newGoal,
      milestones: updatedMilestones
    });
  };

  // Format date to readable format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate statistics
  const completedGoals = goals.filter(g => g.progress === 100).length;
  const inProgressGoals = goals.filter(g => g.progress > 0 && g.progress < 100).length;
  const notStartedGoals = goals.filter(g => g.progress === 0).length;
  const totalMilestones = goals.reduce((acc, goal) => acc + goal.milestones.length, 0);
  const completedMilestones = goals.reduce((acc, goal) => {
    return acc + goal.milestones.filter(m => m.completed).length;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md bg-opacity-80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 flex items-center"
              >
                <Trophy className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">GoalTracker</span>
              </motion.div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <button 
                  onClick={() => setView('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Dashboard
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-100'}`}>
                  All Goals
                </button>
                <button 
                  onClick={() => setView('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === 'calendar' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Calendar
                </button>
              </div>
              <button 
                onClick={() => setShowNewGoalModal(true)}
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                + New Goal
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold text-gray-800">Your Goal Dashboard</h1>
              <p className="mt-2 text-gray-600 max-w-3xl">Track your progress, achieve your dreams. Here's where you stand today.</p>
            </motion.div>
            
            {/* Statistics Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <Flag className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-500">Total Goals</h2>
                    <p className="text-2xl font-semibold text-gray-800">{goals.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-500">Completed</h2>
                    <p className="text-2xl font-semibold text-gray-800">{completedGoals}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Circle className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-500">In Progress</h2>
                    <p className="text-2xl font-semibold text-gray-800">{inProgressGoals}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-500">Milestones</h2>
                    <p className="text-2xl font-semibold text-gray-800">{completedMilestones}/{totalMilestones}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts Row */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Activity Chart */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Activity Trends</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                      <Legend />
                      <Line type="monotone" dataKey="activity" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Distribution */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Goals by Category</h2>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Recent Goals */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.slice(0, 3).map((goal) => (
                  <motion.div
                    key={goal.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{goal.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          goal.category === 'Work' ? 'bg-blue-100 text-blue-800' : 
                          goal.category === 'Personal' ? 'bg-green-100 text-green-800' : 
                          goal.category === 'Education' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {goal.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{goal.description}</p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              goal.progress < 25 ? 'bg-red-500' : 
                              goal.progress < 75 ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex -space-x-2">
                          <img 
                            src={goal.owner.avatar} 
                            alt={goal.owner.name}
                            className="w-6 h-6 rounded-full ring-2 ring-white"
                          />
                          {goal.teammates.map((teammate, idx) => (
                            <img 
                              key={idx}
                              src={teammate.avatar}
                              alt={teammate.name}
                              className="w-6 h-6 rounded-full ring-2 ring-white"
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{formatDate(goal.dueDate)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleViewGoal(goal)}
                        className="mt-4 w-full px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-100 transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold text-gray-800">All Goals</h1>
              <p className="mt-2 text-gray-600">Track and manage all your goals in one place.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{goal.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        goal.category === 'Work' ? 'bg-blue-100 text-blue-800' : 
                        goal.category === 'Personal' ? 'bg-green-100 text-green-800' : 
                        goal.category === 'Education' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {goal.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{goal.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            goal.progress < 25 ? 'bg-red-500' : 
                            goal.progress < 75 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <img 
                          src={goal.owner.avatar} 
                          alt={goal.owner.name}
                          className="w-6 h-6 rounded-full ring-2 ring-white"
                        />
                        {goal.teammates.map((teammate, idx) => (
                          <img 
                            key={idx}
                            src={teammate.avatar}
                            alt={teammate.name}
                            className="w-6 h-6 rounded-full ring-2 ring-white"
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>{formatDate(goal.dueDate)}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleViewGoal(goal)}
                      className="mt-4 w-full px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-100 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold text-gray-800">Goal Calendar</h1>
              <p className="mt-2 text-gray-600">View upcoming deadlines and milestones.</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">May 2025</h2>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                      <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-100">
                      <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Sun</div>
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Mon</div>
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Tue</div>
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Wed</div>
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Thu</div>
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Fri</div>
                <div className="p-2 text-center font-medium text-gray-600 bg-gray-50">Sat</div>
                
                {/* Previous month placeholder */}
                <div className="bg-white p-2 h-32 text-gray-400">30</div>
                
                {/* Current month days */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div key={day} className={`bg-white p-2 h-32 ${day === 15 ? 'ring-2 ring-inset ring-indigo-600' : ''}`}>
                    <div className="flex justify-between">
                      <span className={`text-sm ${day === 15 ? 'font-bold text-indigo-600' : ''}`}>{day}</span>
                      {day === 15 && <span className="text-xs bg-indigo-100 text-indigo-800 px-1 rounded">Today</span>}
                    </div>
                    
                    {/* Display goals due on this day */}
                    {day === 30 && (
                      <div className="mt-1 p-1 text-xs bg-red-100 rounded border-l-4 border-red-500 truncate">
                        Website Redesign Due
                      </div>
                    )}
                    {day === 20 && (
                      <div className="mt-1 p-1 text-xs bg-green-100 rounded border-l-4 border-green-500 truncate">
                        Half-Marathon
                      </div>
                    )}
                    {day === 15 && (
                      <div className="mt-1 p-1 text-xs bg-purple-100 rounded border-l-4 border-purple-500 truncate">
                        Spanish Lesson
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
              <ul className="space-y-4">
                {goals
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .map(goal => (
                    <li key={goal.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className={`w-3 h-3 rounded-full mr-3 ${
                            goal.progress < 25 ? 'bg-red-500' : 
                            goal.progress < 75 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                        ></div>
                        <span className="text-gray-800 font-medium">{goal.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-4">Due {formatDate(goal.dueDate)}</span>
                        <button
                          onClick={() => handleViewGoal(goal)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          View
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </motion.div>
          </div>
        )}
      </main>

      {/* Goal Details Modal */}
      <AnimatePresence>
        {showGoalDetails && activeGoal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${
                      activeGoal.category === 'Work' ? 'bg-blue-100 text-blue-800' : 
                      activeGoal.category === 'Personal' ? 'bg-green-100 text-green-800' : 
                      activeGoal.category === 'Education' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {activeGoal.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800">{activeGoal.title}</h2>
                  </div>
                  <button 
                    onClick={() => setShowGoalDetails(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <p className="mt-2 text-gray-600">{activeGoal.description}</p>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{activeGoal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div 
                      className={`h-2.5 rounded-full ${
                        activeGoal.progress < 25 ? 'bg-red-500' : 
                        activeGoal.progress < 75 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: '0%' }}
                      animate={{ width: `${activeGoal.progress}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                    <div className="mt-2 flex items-center">
                      <img 
                        src={activeGoal.owner.avatar} 
                        alt={activeGoal.owner.name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2 text-gray-800">{activeGoal.owner.name}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                    <div className="mt-2 flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <span className="ml-2 text-gray-800">{formatDate(activeGoal.dueDate)}</span>
                    </div>
                  </div>
                  
                  {activeGoal.teammates.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-500">Team</h3>
                      <div className="mt-2 flex -space-x-2">
                        {activeGoal.teammates.map((teammate, idx) => (
                          <img 
                            key={idx}
                            src={teammate.avatar}
                            alt={teammate.name}
                            className="w-8 h-8 rounded-full ring-2 ring-white"
                            title={teammate.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800">Milestones</h3>
                  <ul className="mt-3 space-y-2">
                    {activeGoal.milestones.map((milestone) => (
                      <motion.li 
                        key={milestone.id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <button 
                          onClick={() => handleToggleMilestone(activeGoal.id, milestone.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded border border-gray-300 flex items-center justify-center ${milestone.completed ? 'bg-green-500 border-green-500' : ''}`}
                        >
                          {milestone.completed && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <span className={`ml-3 ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {milestone.title}
                        </span>
                        {milestone.completed && (
                          <span className="ml-auto flex items-center text-xs text-green-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Comments</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {activeGoal.comments.map((comment) => (
                      <div key={comment.id} className="mb-4 last:mb-0">
                        <div className="flex items-start">
                          <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name} 
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-800">{comment.user.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{formatTimestamp(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {activeGoal.comments.length === 0 && (
                      <p className="text-gray-500 text-sm">No comments yet. Be the first to comment.</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex">
                      <img 
                        src="https://randomuser.me/api/portraits/women/44.jpg" 
                        alt="Your Avatar" 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          rows={2}
                          placeholder="Add a comment..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={handleAddComment}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        disabled={!newComment.trim()}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* New Goal Modal */}
      <AnimatePresence>
        {showNewGoalModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Goal</h2>
                  <button 
                    onClick={() => setShowNewGoalModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter goal title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Describe your goal"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        id="category"
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input
                        type="date"
                        id="dueDate"
                        value={newGoal.dueDate}
                        onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">Milestones</label>
                      <button
                        type="button"
                        onClick={addMilestoneField}
                        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        + Add Milestone
                      </button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {newGoal.milestones.map((milestone, index) => (
                        <input
                          key={index}
                          type="text"
                          value={milestone.title}
                          onChange={(e) => updateMilestone(index, e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder={`Milestone ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewGoalModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddGoal}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={!newGoal.title || !newGoal.description || !newGoal.dueDate}
                  >
                    Create Goal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 3.952-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.952-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-base text-gray-500">
                &copy; 2025 GoalTracker. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
