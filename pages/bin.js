import { useContext, useEffect, useState } from "react";

import Task from "@/components/Task";
import { tasksContext } from "@/store/tasks";

import tasksclasses from "../styles/tasks.module.css";

const bin = () => {
    const { tasksState } = useContext(tasksContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(tasksState.filter(task => task.isBinned));
    }, [tasksState])

    return (
        <>
            <h1>Recycle Bin</h1>
            <div className={tasksclasses.container}>
                {tasks && tasks.map(task => (
                    <Task {...task} key={task.assignTime + task.title} />
                ))}
            </div>
        </>
    )
}

export default bin;