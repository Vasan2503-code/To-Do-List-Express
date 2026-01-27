import React, { useEffect, useState, useMemo } from "react";
import { getTasks, deleteTask, updateTask, createTask } from "../api/Task";
import {
  Trash2, Edit3, CheckCircle, Clock, AlertCircle, XCircle, Plus,
  Calendar, Flag, Filter, ArrowUpDown, Search, Inbox
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Please login to view tasks");
        navigate("/register");
      } else {
        setError("Failed to load tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteTask({ title });
      setTasks(tasks.filter((task) => task.title !== title));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };

  const handleStatusUpdate = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      setTasks(tasks.map((t) => (t.title === task.title ? updatedTask : t)));
      await updateTask({ ...task, status: newStatus });
      toast.success(`Marked as ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
      fetchTasks();
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(formData);
        toast.success("Task updated successfully");
        setTasks(tasks.map((t) => t.title === editingTask.title ? { ...t, ...formData } : t));
      } else {
        const res = await createTask(formData);
        toast.success("Task created successfully");
        setTasks([...tasks, res.data.newTask || res.data]); // Fallback if structure differs
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Error saving task:", err);
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // --- Filtering & Sorting Logic ---
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => filterStatus === "all" || t.status === filterStatus)
      .filter(t => filterPriority === "all" || t.priority === filterPriority)
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "dueAsc") return new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31");
        if (sortBy === "dueDesc") return new Date(b.dueDate || "1970-01-01") - new Date(a.dueDate || "1970-01-01");
        return 0;
      });
  }, [tasks, filterStatus, filterPriority, sortBy]);

  // --- Helper Components ---
  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30",
      medium: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
      low: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30"
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[priority] || colors.medium} flex items-center gap-1`}>
        <Flag size={10} />
        {priority}
      </span>
    );
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "completed": return <CheckCircle className="text-green-500" size={18} />;
      case "in progress": return <Clock className="text-blue-500" size={18} />;
      case "failure": return <XCircle className="text-red-500" size={18} />;
      default: return <AlertCircle className="text-gray-400" size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-full max-w-4xl space-y-4 px-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your tasks efficiently.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter size={16} />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 ring-indigo-500/50 dark:text-gray-300"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 ring-indigo-500/50 dark:text-gray-300"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block"></div>

        <div className="flex items-center gap-2 text-gray-400 ml-auto">
          <ArrowUpDown size={16} />
          <span className="text-sm font-medium">Sort:</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 ring-indigo-500/50 dark:text-gray-300"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueAsc">Due Date (Soonest)</option>
          <option value="dueDesc">Due Date (Latest)</option>
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Inbox size={48} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Try adjusting your filters or create a new task to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="group bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/5 rounded-xl p-4 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row gap-4 items-start md:items-center"
            >
              {/* Status Checkbox */}
              <button
                onClick={() => handleStatusUpdate(task, task.status === 'completed' ? 'pending' : 'completed')}
                className="mt-1 md:mt-0 flex-shrink-0"
                title="Toggle Completion"
              >
                {task.status === 'completed' ?
                  <CheckCircle className="text-indigo-600 dark:text-indigo-500" size={24} /> :
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 transition-colors"></div>
                }
              </button>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={`text-lg font-medium truncate ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </h3>
                  <PriorityBadge priority={task.priority || "medium"} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1 mb-2">
                  {task.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                  {task.dueDate && (
                    <span className={`flex items-center gap-1 ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-red-500' : ''}`}>
                      <Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1 capitalize">
                    <StatusIcon status={task.status} />
                    {task.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity ml-auto md:ml-0">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(task.title)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />
    </div>
  );
};

export default TaskList;