
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Types for our application
type User = {
  id: string;
  name: string;
  avatar: string;
  role: string;
};

type Milestone = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
};

type Comment = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  createdAt: string;
  dueDate: string;
  owner: User;
  team: User[];
  milestones: Milestone[];
  comments: Comment[];
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
};

type ActivityItem = {
  id: string;
  userId: string;
  action: string;
  goalId: string;
  timestamp: string;
};

// Mock Data
const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Morgan',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Product Manager'
  },
  {
    id: 'user2',
    name: 'Jamie Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Developer'
  },
  {
    id: 'user3',
    name: 'Sam Taylor',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Designer'
  },
  {
    id: 'user4',
    name: 'Chris Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    role: 'Marketing'
  },
  {
    id: 'user5',
    name: 'Jordan Lee',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    role: 'Developer'
  }
];

const mockGoals: Goal[] = [
  {
    id: 'goal1',
    title: 'Launch Product v2.0',
    description: 'Complete all the necessary tasks to launch version 2.0 of our product with new features and improvements.',
    category: 'Product',
    progress: 75,
    createdAt: '2025-04-05T10:30:00Z',
    dueDate: '2025-06-15T23:59:59Z',
    owner: mockUsers[0],
    team: [mockUsers[0], mockUsers[1], mockUsers[2]],
    milestones: [
      {
        id: 'ms1-1',
        title: 'Complete UI Redesign',
        completed: true,
        dueDate: '2025-04-25T23:59:59Z'
      },
      {
        id: 'ms1-2',
        title: 'Implement New Features',
        completed: true,
        dueDate: '2025-05-20T23:59:59Z'
      },
      {
        id: 'ms1-3',
        title: 'QA Testing',
        completed: false,
        dueDate: '2025-06-05T23:59:59Z'
      },
      {
        id: 'ms1-4',
        title: 'Launch Day',
        completed: false,
        dueDate: '2025-06-15T23:59:59Z'
      }
    ],
    comments: [
      {
        id: 'comment1-1',
        userId: 'user2',
        text: 'The new search functionality is ready for review.',
        createdAt: '2025-05-01T14:22:00Z'
      },
      {
        id: 'comment1-2',
        userId: 'user3',
        text: 'I\'ve uploaded the final designs for the dashboard.',
        createdAt: '2025-05-03T09:45:00Z'
      },
      {
        id: 'comment1-3',
        userId: 'user1',
        text: 'Great work team! We\'re on track to meet our deadline.',
        createdAt: '2025-05-04T16:30:00Z'
      }
    ],
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'goal2',
    title: 'Increase User Engagement by 30%',
    description: 'Implement strategies to boost user engagement metrics including time spent in app and feature adoption.',
    category: 'Marketing',
    progress: 40,
    createdAt: '2025-04-10T14:00:00Z',
    dueDate: '2025-07-10T23:59:59Z',
    owner: mockUsers[3],
    team: [mockUsers[3], mockUsers[4], mockUsers[0]],
    milestones: [
      {
        id: 'ms2-1',
        title: 'Analyze Current Metrics',
        completed: true,
        dueDate: '2025-04-20T23:59:59Z'
      },
      {
        id: 'ms2-2',
        title: 'Develop Engagement Strategy',
        completed: true,
        dueDate: '2025-05-05T23:59:59Z'
      },
      {
        id: 'ms2-3',
        title: 'Implement In-App Notifications',
        completed: false,
        dueDate: '2025-06-01T23:59:59Z'
      },
      {
        id: 'ms2-4',
        title: 'Measure Results',
        completed: false,
        dueDate: '2025-07-01T23:59:59Z'
      }
    ],
    comments: [
      {
        id: 'comment2-1',
        userId: 'user3',
        text: 'The new onboarding flow looks great!',
        createdAt: '2025-04-25T11:20:00Z'
      },
      {
        id: 'comment2-2',
        userId: 'user4',
        text: 'We should consider adding gamification elements.',
        createdAt: '2025-04-28T15:32:00Z'
      }
    ],
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'goal3',
    title: 'Optimize Database Performance',
    description: 'Improve query speeds and reduce server load by optimizing database architecture and queries.',
    category: 'Engineering',
    progress: 90,
    createdAt: '2025-03-15T09:15:00Z',
    dueDate: '2025-05-15T23:59:59Z',
    owner: mockUsers[1],
    team: [mockUsers[1], mockUsers[4]],
    milestones: [
      {
        id: 'ms3-1',
        title: 'Audit Current Performance',
        completed: true,
        dueDate: '2025-03-25T23:59:59Z'
      },
      {
        id: 'ms3-2',
        title: 'Optimize Main Queries',
        completed: true,
        dueDate: '2025-04-10T23:59:59Z'
      },
      {
        id: 'ms3-3',
        title: 'Implement Caching',
        completed: true,
        dueDate: '2025-04-30T23:59:59Z'
      },
      {
        id: 'ms3-4',
        title: 'Final Testing',
        completed: false,
        dueDate: '2025-05-10T23:59:59Z'
      }
    ],
    comments: [
      {
        id: 'comment3-1',
        userId: 'user2',
        text: 'I\'ve implemented the new indexing strategy and query times are 40% faster!',
        createdAt: '2025-04-12T10:45:00Z'
      },
      {
        id: 'comment3-2',
        userId: 'user5',
        text: 'The Redis cache is working perfectly. Great job!',
        createdAt: '2025-05-01T14:22:00Z'
      }
    ],
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'goal4',
    title: 'Redesign Company Website',
    description: 'Create a modern, responsive website that better showcases our products and improves lead generation.',
    category: 'Design',
    progress: 20,
    createdAt: '2025-04-20T11:00:00Z',
    dueDate: '2025-08-01T23:59:59Z',
    owner: mockUsers[2],
    team: [mockUsers[2], mockUsers[3], mockUsers[4]],
    milestones: [
      {
        id: 'ms4-1',
        title: 'Design Concepts',
        completed: true,
        dueDate: '2025-05-15T23:59:59Z'
      },
      {
        id: 'ms4-2',
        title: 'Prototype Key Pages',
        completed: false,
        dueDate: '2025-06-15T23:59:59Z'
      },
      {
        id: 'ms4-3',
        title: 'Content Creation',
        completed: false,
        dueDate: '2025-07-01T23:59:59Z'
      },
      {
        id: 'ms4-4',
        title: 'Development & Launch',
        completed: false,
        dueDate: '2025-07-30T23:59:59Z'
      }
    ],
    comments: [
      {
        id: 'comment4-1',
        userId: 'user3',
        text: 'I\'ve shared the initial design concepts in Figma.',
        createdAt: '2025-05-02T13:15:00Z'
      }
    ],
    priority: 'medium',
    status: 'not-started'
  },
  {
    id: 'goal5',
    title: 'Implement Automated Testing Framework',
    description: 'Set up a comprehensive automated testing solution to improve code quality and reduce bugs.',
    category: 'Engineering',
    progress: 60,
    createdAt: '2025-03-01T08:00:00Z',
    dueDate: '2025-06-01T23:59:59Z',
    owner: mockUsers[4],
    team: [mockUsers[1], mockUsers[4]],
    milestones: [
      {
        id: 'ms5-1',
        title: 'Research Testing Tools',
        completed: true,
        dueDate: '2025-03-15T23:59:59Z'
      },
      {
        id: 'ms5-2',
        title: 'Setup CI/CD Pipeline',
        completed: true,
        dueDate: '2025-04-01T23:59:59Z'
      },
      {
        id: 'ms5-3',
        title: 'Write Core Test Suite',
        completed: true,
        dueDate: '2025-05-01T23:59:59Z'
      },
      {
        id: 'ms5-4',
        title: 'Documentation & Training',
        completed: false,
        dueDate: '2025-05-20T23:59:59Z'
      }
    ],
    comments: [
      {
        id: 'comment5-1',
        userId: 'user5',
        text: 'Jest and Cypress are set up and running on the CI pipeline.',
        createdAt: '2025-04-05T09:30:00Z'
      },
      {
        id: 'comment5-2',
        userId: 'user2',
        text: 'I\'ve added tests for the authentication flows.',
        createdAt: '2025-04-25T16:42:00Z'
      },
      {
        id: 'comment5-3',
        userId: 'user5',
        text: 'Current test coverage is at 72%. Getting closer to our 80% goal!',
        createdAt: '2025-05-05T11:15:00Z'
      }
    ],
    priority: 'medium',
    status: 'in-progress'
  }
];

const mockActivity: ActivityItem[] = [
  {
    id: 'act1',
    userId: 'user1',
    action: 'created goal',
    goalId: 'goal1',
    timestamp: '2025-04-05T10:30:00Z'
  },
  {
    id: 'act2',
    userId: 'user3',
    action: 'completed milestone',
    goalId: 'goal1',
    timestamp: '2025-04-25T14:20:00Z'
  },
  {
    id: 'act3',
    userId: 'user2',
    action: 'commented on',
    goalId: 'goal1',
    timestamp: '2025-05-01T14:22:00Z'
  },
  {
    id: 'act4',
    userId: 'user1',
    action: 'updated progress on',
    goalId: 'goal1',
    timestamp: '2025-05-02T09:15:00Z'
  },
  {
    id: 'act5',
    userId: 'user4',
    action: 'created goal',
    goalId: 'goal2',
    timestamp: '2025-04-10T14:00:00Z'
  },
  {
    id: 'act6',
    userId: 'user5',
    action: 'completed milestone',
    goalId: 'goal5',
    timestamp: '2025-05-01T10:45:00Z'
  },
  {
    id: 'act7',
    userId: 'user3',
    action: 'created goal',
    goalId: 'goal4',
    timestamp: '2025-04-20T11:00:00Z'
  },
  {
    id: 'act8',
    userId: 'user2',
    action: 'commented on',
    goalId: 'goal5',
    timestamp: '2025-04-25T16:42:00Z'
  }
];

// Chart data for analytics
const progressByCategory = [
  { name: 'Product', value: 75 },
  { name: 'Marketing', value: 40 },
  { name: 'Engineering', value: 75 }, // Average of 90 and 60
  { name: 'Design', value: 20 }
];

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];

const progressOverTime = [
  { name: 'Week 1', Product: 10, Marketing: 5, Engineering: 15, Design: 0 },
  { name: 'Week 2', Product: 20, Marketing: 10, Engineering: 30, Design: 0 },
  { name: 'Week 3', Product: 40, Marketing: 15, Engineering: 45, Design: 5 },
  { name: 'Week 4', Product: 55, Marketing: 25, Engineering: 60, Design: 10 },
  { name: 'Week 5', Product: 75, Marketing: 40, Engineering: 75, Design: 20 }
];

// Main component
const Index = () => {
  // State management
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'goal-details' | 'create-goal' | 'settings' | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [activeMobileTab, setActiveMobileTab] = useState('dashboard');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; text: string; read: boolean }[]>([
    { id: 'n1', text: 'Launch Product v2.0 is due in 30 days', read: false },
    { id: 'n2', text: 'Chris Wilson commented on Increase User Engagement', read: false },
    { id: 'n3', text: 'New milestone completed in Optimize Database Performance', read: true }
  ]);
  const [newGoalData, setNewGoalData] = useState({
    title: '',
    description: '',
    category: 'Product',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  
  const categories = ['Product', 'Marketing', 'Engineering', 'Design', 'Operations'];
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside of notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Filter goals based on category and search
  const filteredGoals = goals.filter(goal => {
    const matchesCategory = filterCategory ? goal.category === filterCategory : true;
    const matchesSearch = searchQuery
      ? goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });
  
  const getUserById = (id: string) => {
    return mockUsers.find(user => user.id === id);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate days remaining for deadline
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Open modal with goal details
  const openGoalDetails = (goal: Goal) => {
    setActiveGoal(goal);
    setModalType('goal-details');
    setModalOpen(true);
  };
  
  // Open modal to create a new goal
  const openCreateGoalModal = () => {
    setModalType('create-goal');
    setModalOpen(true);
  };
  
  // Open settings modal
  const openSettingsModal = () => {
    setModalType('settings');
    setModalOpen(true);
  };
  
  // Close any open modal
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalType(null);
      setActiveGoal(null);
    }, 300);
  };
  
  // Add a comment to a goal
  const addComment = () => {
    if (!activeGoal || !newComment.trim()) return;
    
    const updatedGoals = goals.map(goal => {
      if (goal.id === activeGoal.id) {
        const newCommentObj = {
          id: `comment-${Date.now()}`,
          userId: 'user1', // Current user
          text: newComment,
          createdAt: new Date().toISOString()
        };
        
        const updatedGoal = {
          ...goal,
          comments: [...goal.comments, newCommentObj]
        };
        
        setActiveGoal(updatedGoal);
        return updatedGoal;
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setNewComment('');
    
    // Focus back on input
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };
  
  // Toggle milestone completion
  const toggleMilestone = (goalId: string, milestoneId: string) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        // Calculate new progress percentage
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const totalCount = updatedMilestones.length;
        const newProgress = Math.round((completedCount / totalCount) * 100);
        
        const updatedGoal = {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress
        };
        
        if (activeGoal && activeGoal.id === goal.id) {
          setActiveGoal(updatedGoal);
        }
        
        return updatedGoal;
      }
      return goal;
    });
    
    setGoals(updatedGoals);
  };
  
  // Create a new goal
  const handleCreateGoal = () => {
    if (!newGoalData.title || !newGoalData.dueDate) return;
    
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: newGoalData.title,
      description: newGoalData.description,
      category: newGoalData.category,
      progress: 0,
      createdAt: new Date().toISOString(),
      dueDate: new Date(newGoalData.dueDate).toISOString(),
      owner: mockUsers[0], // Current user
      team: [mockUsers[0]], // Start with just the creator
      milestones: [], // No milestones at creation
      comments: [], // No comments at creation
      priority: newGoalData.priority,
      status: 'not-started'
    };
    
    setGoals([...goals, newGoal]);
    
    // Reset form and close modal
    setNewGoalData({
      title: '',
      description: '',
      category: 'Product',
      dueDate: '',
      priority: 'medium'
    });
    
    closeModal();
    
    // Add notification
    const newNotification = {
      id: `n-${Date.now()}`,
      text: `New goal created: ${newGoalData.title}`,
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };
  
  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Get count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-danger';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white';
      case 'in-progress':
        return 'bg-primary text-white';
      case 'on-hold':
        return 'bg-warning text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                  className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-md flex items-center justify-center mr-3"
                >
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h1 className="text-xl font-semibold text-gray-900">GoalFlow</h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center px-2 lg:px-0">
              <div className="max-w-lg w-full">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search goals..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-danger text-xs font-medium text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs text-primary-500 hover:text-primary-700 focus:outline-none"
                          >
                            Mark all as read
                          </button>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="px-4 py-3 text-sm text-gray-500">No notifications</p>
                          ) : (
                            notifications.map(notification => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                              >
                                <p className="text-sm text-gray-700">{notification.text}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Settings Button */}
              <button
                className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={openSettingsModal}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center">
                <div className="hidden sm:flex flex-col items-end mr-3">
                  <span className="text-sm font-medium text-gray-700">Alex Morgan</span>
                  <span className="text-xs text-gray-500">Product Manager</span>
                </div>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Tabs */}
          <div className="sm:hidden border-t border-gray-200">
            <div className="flex justify-around">
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${
                  activeMobileTab === 'dashboard'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveMobileTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${
                  activeMobileTab === 'goals'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveMobileTab('goals')}
              >
                Goals
              </button>
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${
                  activeMobileTab === 'analytics'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveMobileTab('analytics')}
              >
                Analytics
              </button>
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${
                  activeMobileTab === 'activity'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveMobileTab('activity')}
              >
                Activity
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ ease: "easeOut", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-20 bg-white border-r border-gray-200 pt-16 w-64 transform lg:translate-x-0 lg:static lg:inset-auto lg:flex-shrink-0"
            >
              <div className="h-full flex flex-col overflow-y-auto">
                {/* Sidebar Content */}
                <nav className="flex-1 px-2 py-4 space-y-1">
                  <div className="mb-6 px-3">
                    <button
                      onClick={openCreateGoalModal}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      New Goal
                    </button>
                  </div>
                  
                  {/* Navigation Links */}
                  <a href="#dashboard" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary-50 text-primary-700">
                    <svg className="mr-3 h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </a>
                  
                  <a href="#goals" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Goals
                  </a>
                  
                  <a href="#team" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Team Goals
                  </a>
                  
                  <a href="#analytics" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                  </a>
                  
                  <a href="#calendar" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Calendar
                  </a>
                  
                  {/* Filter Section */}
                  <div className="pt-6 pb-2">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Filter by Category
                    </h3>
                  </div>
                  
                  <div className="space-y-1 px-3">
                    <button
                      onClick={() => setFilterCategory(null)}
                      className={`flex items-center w-full text-left px-2 py-1 text-sm font-medium rounded-md ${
                        filterCategory === null ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      All Categories
                    </button>
                    
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setFilterCategory(category)}
                        className={`flex items-center w-full text-left px-2 py-1 text-sm font-medium rounded-md ${
                          filterCategory === category ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  
                  {/* Team Section */}
                  <div className="pt-6 pb-2">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Team Members
                    </h3>
                  </div>
                  
                  <div className="space-y-1 px-3">
                    {mockUsers.map(user => (
                      <a
                        key={user.id}
                        href="#"
                        className="flex items-center px-2 py-1 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="mr-2 h-6 w-6 rounded-full"
                        />
                        <span>{user.name}</span>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 focus:outline-none">
          <div className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Dashboard */}
              {(activeMobileTab === 'dashboard' || !activeMobileTab) && (
                <div className="space-y-6">
                  {/* Welcome Section */}
                  <div className="md:flex md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">Welcome back, Alex</h2>
                      <p className="mt-1 text-sm text-gray-500">Here's what's happening with your goals today.</p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                      <button
                        onClick={openCreateGoalModal}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Goal
                      </button>
                    </div>
                  </div>
                  
                  {/* Stats Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                          <div className="absolute bg-primary-500 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total Goals</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                          <p className="text-2xl font-semibold text-gray-900">{goals.length}</p>
                          <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                            <div className="text-sm">
                              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">View all<span className="sr-only"> goals</span></a>
                            </div>
                          </div>
                        </dd>
                      </div>
                      
                      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                          <div className="absolute bg-secondary-500 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="ml-16 text-sm font-medium text-gray-500 truncate">In Progress</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                          <p className="text-2xl font-semibold text-gray-900">{goals.filter(g => g.status === 'in-progress').length}</p>
                          <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Increased by</span>
                            2
                          </p>
                          <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                            <div className="text-sm">
                              <a href="#" className="font-medium text-secondary-600 hover:text-secondary-500">View all<span className="sr-only"> in progress</span></a>
                            </div>
                          </div>
                        </dd>
                      </div>
                      
                      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                          <div className="absolute bg-success rounded-md p-3">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <p className="ml-16 text-sm font-medium text-gray-500 truncate">Completed Milestones</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                          <p className="text-2xl font-semibold text-gray-900">
                            {goals.reduce((total, goal) => total + goal.milestones.filter(m => m.completed).length, 0)}
                          </p>
                          <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                            <div className="text-sm">
                              <a href="#" className="font-medium text-success hover:text-green-700">View milestones<span className="sr-only"> stats</span></a>
                            </div>
                          </div>
                        </dd>
                      </div>
                      
                      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                          <div className="absolute bg-warning rounded-md p-3">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="ml-16 text-sm font-medium text-gray-500 truncate">Upcoming Deadlines</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                          <p className="text-2xl font-semibold text-gray-900">
                            {goals.filter(g => getDaysRemaining(g.dueDate) <= 30 && getDaysRemaining(g.dueDate) > 0).length}
                          </p>
                          <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                            <div className="text-sm">
                              <a href="#" className="font-medium text-warning hover:text-yellow-700">View calendar<span className="sr-only"> stats</span></a>
                            </div>
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </motion.div>
                  
                  {/* Quick Analytics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Progress by Category */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white shadow rounded-lg"
                    >
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Progress by Category</h3>
                        <div className="mt-1 text-sm text-gray-500">A summary of goal completion across categories.</div>
                        
                        <div className="mt-4 h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={progressByCategory}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {progressByCategory.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => `${value}%`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Progress Over Time */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-white shadow rounded-lg"
                    >
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Progress Over Time</h3>
                        <div className="mt-1 text-sm text-gray-500">Weekly progress tracking for all goals.</div>
                        
                        <div className="mt-4 h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={progressOverTime}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="Product" stroke="#6366f1" activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="Marketing" stroke="#0ea5e9" />
                              <Line type="monotone" dataKey="Engineering" stroke="#10b981" />
                              <Line type="monotone" dataKey="Design" stroke="#f59e0b" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Active Goal Cards */}
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-3">Active Goals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredGoals.map((goal, index) => (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                {goal.category}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${getStatusColor(goal.status)}`}>
                                {goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('-', ' ')}
                              </span>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-lg font-semibold text-gray-900 truncate">{goal.title}</h4>
                              <p className="mt-2 text-sm text-gray-500 line-clamp-2" title={goal.description}>
                                {goal.description}
                              </p>
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${goal.progress}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-2.5 rounded-full bg-primary-500"
                                />
                              </div>
                            </div>
                            
                            <div className="mt-5 flex items-center">
                              <div className="flex -space-x-2 mr-2">
                                {goal.team.slice(0, 3).map((user) => (
                                  <img
                                    key={user.id}
                                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                    src={user.avatar}
                                    alt={user.name}
                                    title={user.name}
                                  />
                                ))}
                                {goal.team.length > 3 && (
                                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
                                    +{goal.team.length - 3}
                                  </span>
                                )}
                              </div>
                              
                              <div className="text-xs text-gray-500">
                                {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} milestones
                              </div>
                              
                              <div className="ml-auto flex items-center">
                                <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-gray-500">
                                  Due {formatDate(goal.dueDate)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex space-x-3">
                              <button
                                onClick={() => openGoalDetails(goal)}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                View Details
                              </button>
                              
                              <button
                                onClick={() => {
                                  const firstIncompleteMilestone = goal.milestones.find(m => !m.completed);
                                  if (firstIncompleteMilestone) {
                                    toggleMilestone(goal.id, firstIncompleteMilestone.id);
                                  }
                                }}
                                disabled={goal.milestones.every(m => m.completed)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                {goal.milestones.every(m => m.completed) ? (
                                  'All Complete'
                                ) : (
                                  <>
                                    <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Next Milestone
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {filteredGoals.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center bg-white p-8 rounded-lg border-2 border-dashed border-gray-300">
                          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No goals found</h3>
                          <p className="mt-1 text-sm text-gray-500">Create a new goal to get started or adjust your filters.</p>
                          <div className="mt-4">
                            <button
                              onClick={openCreateGoalModal}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              New Goal
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest updates from your team.</p>
                    </div>
                    
                    <div className="border-t border-gray-200 divide-y divide-gray-200">
                      {mockActivity.slice(0, 5).map(activity => {
                        const user = getUserById(activity.userId);
                        const goal = goals.find(g => g.id === activity.goalId);
                        
                        return (
                          <div key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user?.avatar}
                                  alt={user?.name}
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {user?.name} {activity.action} <span className="font-semibold">{goal?.title}</span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(activity.timestamp)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-primary-600 hover:text-primary-500">View all activity<span className="sr-only"> activity logs</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Analytics Tab Content */}
              {activeMobileTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                  
                  {/* Progress by Category */}
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Progress by Category</h3>
                      <div className="mt-1 text-sm text-gray-500">A summary of goal completion across categories.</div>
                      
                      <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={progressByCategory}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {progressByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Over Time */}
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Progress Over Time</h3>
                      <div className="mt-1 text-sm text-gray-500">Weekly progress tracking for all goals.</div>
                      
                      <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={progressOverTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Product" stroke="#6366f1" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Marketing" stroke="#0ea5e9" />
                            <Line type="monotone" dataKey="Engineering" stroke="#10b981" />
                            <Line type="monotone" dataKey="Design" stroke="#f59e0b" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Goals Tab Content */}
              {activeMobileTab === 'goals' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">My Goals</h2>
                    <button
                      onClick={openCreateGoalModal}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      New Goal
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {filteredGoals.map((goal) => (
                      <div
                        key={goal.id}
                        className="bg-white shadow rounded-lg overflow-hidden"
                      >
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex justify-between">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                              {goal.category}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${getStatusColor(goal.status)}`}>
                              {goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-900">{goal.title}</h4>
                            <p className="mt-2 text-sm text-gray-500">
                              {goal.description}
                            </p>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full bg-primary-500"
                                style={{ width: `${goal.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-500">
                                  Due {formatDate(goal.dueDate)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className={`mr-1 font-medium ${getPriorityColor(goal.priority)}`}>
                                  {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-5">
                            <button
                              onClick={() => openGoalDetails(goal)}
                              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Mobile Activity Tab Content */}
              {activeMobileTab === 'activity' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="border-t border-gray-200 divide-y divide-gray-200">
                      {mockActivity.map(activity => {
                        const user = getUserById(activity.userId);
                        const goal = goals.find(g => g.id === activity.goalId);
                        
                        return (
                          <div key={activity.id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user?.avatar}
                                  alt={user?.name}
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {user?.name} {activity.action} <span className="font-semibold">{goal?.title}</span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(activity.timestamp)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Goal Details Modal */}
      <AnimatePresence>
        {modalOpen && modalType === 'goal-details' && activeGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal} />
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{activeGoal.title}</h3>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(activeGoal.status)}`}>
                              {activeGoal.status.charAt(0).toUpperCase() + activeGoal.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{activeGoal.category} • Created on {formatDate(activeGoal.createdAt)}</p>
                        </div>
                        <button
                          onClick={closeModal}
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <span className="sr-only">Close</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={activeGoal.owner.avatar}
                              alt={activeGoal.owner.name}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {activeGoal.owner.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activeGoal.owner.role}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="text-sm text-gray-500">
                          {activeGoal.description}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{activeGoal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${activeGoal.progress}%` }}
                            className="h-2.5 rounded-full bg-primary-500"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 text-sm">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-500">
                              Due {formatDate(activeGoal.dueDate)}
                            </span>
                          </div>
                          
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 ${getPriorityColor(activeGoal.priority)}`}>
                              {activeGoal.priority.charAt(0).toUpperCase() + activeGoal.priority.slice(1)} Priority
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Team Members */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Team Members</h4>
                        <div className="mt-2 flex -space-x-1 overflow-hidden">
                          {activeGoal.team.map((user) => (
                            <img
                              key={user.id}
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src={user.avatar}
                              alt={user.name}
                              title={user.name}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Milestones */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Milestones</h4>
                        <ul className="mt-2 space-y-4">
                          {activeGoal.milestones.map((milestone) => (
                            <motion.li
                              key={milestone.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-start"
                            >
                              <div className="flex-shrink-0 relative">
                                <button
                                  onClick={() => toggleMilestone(activeGoal.id, milestone.id)}
                                  className={`h-6 w-6 flex items-center justify-center rounded-full border-2 ${
                                    milestone.completed
                                      ? 'bg-primary-500 border-primary-500 text-white'
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {milestone.completed && (
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                                {milestone.completed && (
                                  <span className="absolute -right-1 -top-1 animate-ping-slow opacity-75 h-3 w-3 rounded-full bg-primary-500" />
                                )}
                              </div>
                              
                              <div className="ml-3 flex-1">
                                <div className="flex justify-between items-center">
                                  <span className={`text-sm font-medium ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                    {milestone.title}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Due {formatDate(milestone.dueDate)}
                                  </span>
                                </div>
                                
                                {milestone.completed && (
                                  <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Completed
                                  </span>
                                )}
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Comments */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Comments & Feedback</h4>
                        <div className="mt-2 flow-root">
                          <ul className="divide-y divide-gray-200">
                            {activeGoal.comments.map((comment) => {
                              const commentUser = getUserById(comment.userId);
                              return (
                                <motion.li
                                  key={comment.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="py-4"
                                >
                                  <div className="flex space-x-3">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={commentUser?.avatar}
                                      alt={commentUser?.name}
                                    />
                                    <div className="flex-1 space-y-1">
                                      <div className="flex items-center justify-between">
                                        <h5 className="text-sm font-medium text-gray-900">{commentUser?.name}</h5>
                                        <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                                      </div>
                                      <p className="text-sm text-gray-500">{comment.text}</p>
                                    </div>
                                  </div>
                                </motion.li>
                              );
                            })}
                            
                            {activeGoal.comments.length === 0 && (
                              <li className="py-4">
                                <p className="text-sm text-gray-500 text-center">No comments yet. Be the first to provide feedback.</p>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Add Comment */}
                      <div className="mt-4">
                        <div className="flex">
                          <div className="flex-shrink-0 mr-3">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={mockUsers[0].avatar}
                              alt={mockUsers[0].name}
                            />
                          </div>
                          <div className="w-full">
                            <textarea
                              ref={commentInputRef}
                              rows={3}
                              className="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            
                            <div className="mt-3 flex justify-end">
                              <button
                                type="button"
                                onClick={addComment}
                                disabled={!newComment.trim()}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                Post Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Create Goal Modal */}
        {modalOpen && modalType === 'create-goal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal} />
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Goal</h3>
                      <div className="mt-4">
                        <form onSubmit={(e) => { e.preventDefault(); handleCreateGoal(); }}>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                              <input
                                type="text"
                                name="title"
                                id="title"
                                value={newGoalData.title}
                                onChange={(e) => setNewGoalData({ ...newGoalData, title: e.target.value })}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={newGoalData.description}
                                onChange={(e) => setNewGoalData({ ...newGoalData, description: e.target.value })}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                              <select
                                id="category"
                                name="category"
                                value={newGoalData.category}
                                onChange={(e) => setNewGoalData({ ...newGoalData, category: e.target.value })}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                              >
                                {categories.map(category => (
                                  <option key={category} value={category}>{category}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                              <select
                                id="priority"
                                name="priority"
                                value={newGoalData.priority}
                                onChange={(e) => setNewGoalData({ ...newGoalData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                              <input
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                value={newGoalData.dueDate}
                                onChange={(e) => setNewGoalData({ ...newGoalData, dueDate: e.target.value })}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                                required
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleCreateGoal}
                    disabled={!newGoalData.title || !newGoalData.dueDate}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Create Goal
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Settings Modal */}
        {modalOpen && modalType === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal} />
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                      <div className="mt-4">
                        <div className="space-y-6">
                          {/* Account Section */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Account</h4>
                            <div className="mt-4 flex items-center">
                              <img
                                className="h-12 w-12 rounded-full"
                                src={mockUsers[0].avatar}
                                alt={mockUsers[0].name}
                              />
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{mockUsers[0].name}</p>
                                <p className="text-sm text-gray-500">{mockUsers[0].role}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Notification Settings */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Notifications</h4>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between">
                                <label htmlFor="email-notifications" className="text-sm text-gray-700">
                                  Email Notifications
                                </label>
                                <button
                                  type="button"
                                  className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-500"
                                >
                                  <span className="sr-only">Toggle email notifications</span>
                                  <span
                                    className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  >
                                    <span
                                      className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-0 ease-out duration-100"
                                    >
                                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                        <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </span>
                                  </span>
                                </button>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <label htmlFor="push-notifications" className="text-sm text-gray-700">
                                  Push Notifications
                                </label>
                                <button
                                  type="button"
                                  className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-500"
                                >
                                  <span className="sr-only">Toggle push notifications</span>
                                  <span
                                    className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  >
                                    <span
                                      className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-0 ease-out duration-100"
                                    >
                                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                        <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Privacy Settings */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Privacy</h4>
                            <div className="mt-2">
                              <div className="flex items-center justify-between">
                                <label htmlFor="public-profile" className="text-sm text-gray-700">
                                  Make Profile Public
                                </label>
                                <button
                                  type="button"
                                  className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-gray-200"
                                >
                                  <span className="sr-only">Make profile public</span>
                                  <span
                                    className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  >
                                    <span
                                      className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 ease-in duration-200"
                                    >
                                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                        <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
