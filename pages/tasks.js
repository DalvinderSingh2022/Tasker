import { useContext, useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import Task from "@/components/Task";
import { tasksContext } from "@/store/tasks";

import tasksclasses from "../styles/tasks.module.css";

const tasks = () => {
    const { tasksState } = useContext(tasksContext);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setTasks(tasksState.filter(task => !task.isBinned));
    }, [tasksState])

    return (
        <>
            <h1>Tasks</h1>
            <section>
                <input
                    type="search"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="round" onClick={() => setTasks(tasks.filter(task => task.detail.include(search) || task.title.include(search)))}>
                    <FaSearch />
                </button>
            </section>
            <div className={tasksclasses.container}>
                {tasks && tasks.map(task => (
                    <Task {...task} key={task.assignTime + task.title} />
                ))}
            </div>
        </>
    )
}

export default tasks;