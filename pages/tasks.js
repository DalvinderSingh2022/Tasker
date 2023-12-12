import { useContext, useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import Task from "@/components/Task";
import { tasksContext } from "@/store/tasks";

import tasksclasses from "../styles/tasks.module.css";
import Loading from "@/components/Loading";

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
                {tasks?.length ? tasks.map(task => {
                    <Task {...task} key={task.uid || task.assignTime} />
                }) : (tasks ? <Loading /> : <div>There is no task</div>)}
            </div>
        </>
    )
}

export default tasks;