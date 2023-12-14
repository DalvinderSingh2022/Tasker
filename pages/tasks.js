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
    }, [tasksState]);

    if (!tasksState) {
        return <Loading full={true} />
    }

    return (
        <>
            <h1>Tasks</h1>
            <section>
                <input
                    type="search"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (!e.target.value) {
                            setTasks(tasksState);
                        }
                    }}
                />
                <button className="round" onClick={() => setTasks(() => {
                    return tasks.filter(task => task.detail.search(search) > -1 || task.title.search(search) > -1)
                })}>
                    <FaSearch />
                </button>
            </section>
            <div className={tasksclasses.container}>
                {tasks?.length ? tasks.map(task =>
                    <Task {...task} key={task.uid || task.assignTime} />
                ) : <div>There is no task</div>}
            </div>
        </>
    )
}

export default tasks;