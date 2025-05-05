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
                      <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor
