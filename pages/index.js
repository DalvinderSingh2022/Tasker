import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import cssClasses from "../styles/dashboard.module.css";
import NewTask from "@/components/NewTask";
import { authContext } from "@/store/auth";
import { tasksContext } from "@/store/tasks";
import Task from "@/components/Task";

import tasksclasses from "../styles/tasks.module.css";
const index = () => {
    const router = useRouter();
    const [newTask, setNewTask] = useState(false);
    const { authState } = useContext(authContext);
    const { tasksState } = useContext(tasksContext);
    const [updateTasks, setUpdatetasks] = useState(null);
    const sections = [
        {
            header: "Today",
            tasks: []
        }, {
            header: "Tomorrow",
            tasks: []
        }, {
            header: "This Month",
            tasks: []
        }];

    useEffect(() => {
        tasksState.forEach(task => {
            const date = (new Date(task.duedate)).getDate();
            const month = (new Date(task.duedate)).getMonth();
            const year = (new Date(task.duedate)).getFullYear();

            if (date === (new Date()).getDate() && month === (new Date()).getMonth() && year === (new Date()).getFullYear()) {
                sections[0].tasks.push(task);
            }
            else if (date === ((new Date()).getDate() + 1) && month === (new Date()).getMonth() && year === (new Date()).getFullYear()) {
                sections[1].tasks.push(task);
            }
            else if (month === (new Date()).getMonth() && year === (new Date()).getFullYear()) {
                sections[2].tasks.push(task);
            }
        });
        setUpdatetasks(sections);
    }, [tasksState])

    if (!authState?.isAuthenticated) {
        router.push("/auth/signin");
    }

    return (
        <>
            <header className={cssClasses.header}>
                <div>
                    hello, {authState?.displayName}
                </div>
                <button onClick={() => setNewTask(prev => !prev)} className="round"><FaPlus /></button>
            </header>
            {updateTasks && updateTasks.map((section) => (
                <div key={section.header}>
                    <h2>{section.header}</h2>
                    <div className={tasksclasses.container}>
                        {section.tasks.length > 0 ? section.tasks.map(task => <Task {...task} key={task.title + task.assignTime} />) : <p>No tasks in {section.header}</p>}
                    </div>
                </div>
            ))}
            {newTask && <NewTask removeContainer={() => setNewTask(prev => !prev)} />}
        </>
    )
}

export default index;