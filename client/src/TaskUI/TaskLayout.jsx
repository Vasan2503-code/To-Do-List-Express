import React from 'react';
import TaskList from './TaskList';
 import Navbar from './Navbar';

function TaskLayout() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <TaskList />
        </div>
    )
}

export default TaskLayout