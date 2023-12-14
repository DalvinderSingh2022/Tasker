import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

import { useContext, useState } from "react";

import { FaRegSave } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { ImRadioUnchecked } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa6";
import { LiaTrashRestoreSolid } from "react-icons/lia";

import { authContext } from "@/store/auth";
import { tasksContext } from "@/store/tasks";

import authclasses from "../styles/auth.module.css";
import taskclasses from "../styles/task.module.css";
import Alert from "./Alert";

const EditTask = ({ proptask, removeContainer }) => {
    const { authState } = useContext(authContext);
    const { tasksDispatch, setUpdateTask } = useContext(tasksContext);
    const [task, setTask] = useState({ ...proptask });
    const [alert, setAlert] = useState(null);

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handler = async (dispatchType, params) => {
        await setDoc(doc(collection(db, authState.uid), params.uid || params.assignTime), { ...params })
            .then(() => {
                tasksDispatch({
                    type: dispatchType,
                    payload: { task: { ...params } }
                });
                setUpdateTask({ ...params });
                removeContainer();
            })
            .catch(error => {
                console.error(error);
                setAlert({ message: error.message, type: 'red' });
            });
    }

    const handleDelete = async () => {
        await deleteDoc(doc(db, authState.uid, task.uid || task.assignTime))
            .then(() => {
                tasksDispatch({
                    type: "DELETETASK",
                    payload: { task }
                });
                setUpdateTask({ ...params });
                removeContainer();
                setAlert({ message: "Task  deleted successfully", type: 'yellow' });
            })
            .catch(error => {
                console.error(error);
                setAlert({ message: error.message, type: 'red' });
            });
    }

    return (
        <>
            <div className="globalBox">
                <div className={taskclasses.container}>
                    <div className={authclasses.form}>
                        <div className={authclasses.group} >
                            <label htmlFor="title">Title</label>
                            <input
                                disabled={task.isBinned}
                                type="text"
                                id='title'
                                name='title'
                                placeholder='Enter title'
                                value={task.title || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>
                        <div className={authclasses.group} >
                            <label htmlFor="detail">Details</label>
                            <textarea
                                disabled={task.isBinned}
                                cols={5}
                                rows={5}
                                id='detail'
                                name='detail'
                                placeholder='Enter detail'
                                value={task.detail || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>
                        <div className={taskclasses.group} >
                            <div className={authclasses.group}>
                                <label htmlFor="duedate">Duedate</label>
                                <input
                                    disabled={task.isBinned}
                                    type='date'
                                    id='duedate'
                                    name='duedate'
                                    placeholder='Enter duedate'
                                    value={task.duedate || ''}
                                    onChange={(e) => handlechange(e)} />
                            </div>

                            {!task.isBinned ?
                                <>
                                    <button className='round long blue' onClick={() => {
                                        handler("UPDATETASK", { ...task });
                                        setAlert({ message: "Task changes saved successfully", type: 'blue' });
                                    }}><FaRegSave />save</button>

                                    {task.status !== "complete"
                                        ? <button className='round long green' onClick={() => {
                                            handler("UPDATETASK", { ...task, status: "complete" });
                                            setAlert({ message: "Task marked completed", type: 'blue' });
                                        }}><FaRegCheckCircle />check</button>

                                        : <button className='round long blue' onClick={() => {
                                            handler("UPDATETASK", { ...task, status: "todo" });
                                            setAlert({ message: "Task marked incomplete", type: 'yellow' });
                                        }}><ImRadioUnchecked />uncheck</button>
                                    }
                                    <button className='round long red' onClick={() => {
                                        handler("UPDATETASK", { ...task, isBinned: true });
                                        setAlert({ message: "Task  moved to recycle bin", type: 'yellow' });
                                    }}><FaRecycle />bin</button>
                                </> :
                                <>
                                    <button className='round long blue' onClick={() => {
                                        handler("UPDATETASK", { ...task, isBinned: false });
                                        setAlert({ message: "Task removed from recycle bin", type: 'blue' });
                                    }}><LiaTrashRestoreSolid />restore</button>

                                    <button className='round long red' onClick={handleDelete}><MdDeleteOutline />delete</button>
                                </>
                            }

                            <button className='round long' onClick={() => removeContainer()}><FaXmark />close</button>
                        </div>
                    </div>
                </div>
            </div>
            {alert && <Alert {...alert} setAlert={setAlert} />}
        </>
    )
}

export default EditTask;