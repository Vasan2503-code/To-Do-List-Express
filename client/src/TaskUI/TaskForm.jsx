import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ""
            });
        } else {
            setFormData({ title: "", description: "", status: "pending", priority: "medium", dueDate: "" });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {initialData ? "Edit Task" : "Create New Task"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            className={`w-full bg-white dark:bg-gray-800 border ${initialData ? "border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-500"
                                } rounded-lg px-4 py-2 outline-none transition-colors`}
                            placeholder="e.g., Fix Navigation Bug"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                            disabled={!!initialData}
                            title={initialData ? "Title cannot be changed" : ""}
                        />
                        {initialData && (
                            <p className="text-xs text-gray-500 mt-1">
                                Title cannot be changed once created.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Description
                        </label>
                        <textarea
                            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors min-h-[100px] resize-none"
                            placeholder="Describe the task details..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                                Priority
                            </label>
                            <select
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({ ...formData, priority: e.target.value })
                                }
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
                                value={formData.dueDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, dueDate: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Status
                        </label>
                        <select
                            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="failure">Failure</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                        >
                            {initialData ? "Save Changes" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;