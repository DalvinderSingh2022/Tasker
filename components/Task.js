import { memo } from "react";
import { MdOutlineEdit } from "react-icons/md";

import formclasses from "../styles/auth.module.css";
import tasksclasses from "../styles/tasks.module.css";

const Task = ({ title, detail, duedate }) => {
    return (
        <div className={tasksclasses.task}>
            <form className={formclasses.form}>
                <div className={formclasses.group} >
                    <input
                        disabled={true}
                        type="text"
                        id='title'
                        name='title'
                        value={title} />
                    <button type='button' className="round"><MdOutlineEdit /></button>
                </div>
                <div className={formclasses.group} >
                    <textarea
                        rows={2}
                        disabled={true}
                        id='detail'
                        name='detail'
                        value={detail} />
                </div>
                <div className={formclasses.group} >
                    <p>{(new Date(duedate)).toDateString()}</p>
                </div>
            </form>
        </div>
    )
}

export default memo(Task);