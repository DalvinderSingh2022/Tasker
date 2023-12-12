import { memo, useState } from "react";

import { MdOutlineEdit } from "react-icons/md";

import EditTask from "./EditTask";

import authclasses from "../styles/auth.module.css";
import tasksclasses from "../styles/tasks.module.css";
import taskclasses from "../styles/task.module.css";


const Task = (task) => {
    const { title, detail, duedate, status } = task;
    const [editTask, setEditTask] = useState(false);
    return (
        <>
            <div className={tasksclasses.task}>
                <form className={authclasses.form}>
                    <div className={authclasses.group} >
                        <input
                            disabled={true}
                            type="text"
                            id='title'
                            name='title'
                            value={title} />
                        <button type='button' className="round" onClick={() => setEditTask(prev => !prev)}><MdOutlineEdit /></button>
                    </div>
                    <div className={authclasses.group} >
                        <textarea
                            rows={2}
                            disabled={true}
                            id='detail'
                            name='detail'
                            value={detail} />
                    </div>
                    <div className={taskclasses.group} >
                        <p>{(new Date(duedate)).toDateString()}</p>
                        <span className={status.replace(" ", "") + " status"}>{status}</span>
                    </div>
                </form>
            </div>
            {editTask && <EditTask proptask={task} removeContainer={() => setEditTask(prev => !prev)} />}
        </>
    )
}

export default memo(Task);