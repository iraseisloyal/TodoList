import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([
        { title: 'Finish user onboarding',dueDate:'Tommorow',comments:'1', completed: false },
        { title: 'Solve the Dabble prioritisation issue', completed: false }
        , { title: 'Solve the Dabble prioritisation issue', dueDate: 'Jan 8, 2022', comments: 2, attachments: 1, tags: ['LaunchPad'], completed: false },
        { title: 'Hold to reorder on mobile', dueDate: 'Jan 10, 2022', comments: 0, attachments: 0, tags: ['Dabble'], completed: false },
        { title: 'Update onboarding workflow templates', dueDate: '', comments: 0, attachments: 0, tags: [], completed: false },
        { title: 'Connect time-tracking with tasks', dueDate: '', comments: 0, attachments: 0, tags: [], completed: false }
]);

    const [newTask, setNewTask] = useState('');

    const toggleComplete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { title: newTask, completed: false }]);
            setNewTask('');
        }
    };

    return (
        <div className="fixed top-0 right-0 h-screen w-[calc(100%-16rem)] p-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Todo-List</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="New task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="border px-2 py-1 rounded w-full sm:w-auto"
                    />
                    <button
                        className=" text-white px-4 py-2 rounded hover:bg-blue-600"
                        style={{
                            background:"blue"
                        }}
                        onClick={addTask}
                    >
                        <i class="fa-regular fa-pen-to-square"></i> &nbsp;&nbsp;&nbsp;
                        Add Task
                    </button>
                </div>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="bg-white p-4 mb-2 rounded shadow flex items-center justify-between">
                        <div className="flex items-center flex-1">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={task.completed}
                                onChange={() => toggleComplete(index)}
                            />
                            <div className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                            </div>
                        </div>
                        <button
                            style={{ background: "red" }}
                            className="ml-4 bg-red-500 text-white w-8 h-8 flex justify-center items-center rounded-full hover:bg-red-700"
                            onClick={() => deleteTask(index)}
                        >
                            <i class="fa-solid fa-eraser" style={{background:"red"}}></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;