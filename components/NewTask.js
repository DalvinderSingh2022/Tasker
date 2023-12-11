import { authContext } from '@/store/auth';
import { tasksContext } from '@/store/tasks';
import { useContext, useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore";

import { FaRegSave } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import formclasses from "../styles/auth.module.css";
import taskclasses from "../styles/task.module.css";

const NewTask = ({ removeContainer }) => {
    const { tasksDispatch } = useContext(tasksContext);
    const { authState } = useContext(authContext);
    const [task, setTask] = useState({
        title: null,
        detail: null,
        duedate: null,
        assignTime: (new Date()).getTime(),
        section: "task"
    });

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, (authState.uid).toString()), { ...task })
            .then(() => {
                tasksDispatch({
                    type: "ADDTASK",
                    payload: { task }
                });
                removeContainer();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className={taskclasses.container}>
            <form className={formclasses.form} onSubmit={(e) => handlesubmit(e)}>
                <div className={formclasses.group} >
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id='title'
                        name='title'
                        placeholder='Enter title'
                        value={task.title || ''}
                        onChange={(e) => handlechange(e)} />
                </div>
                <div className={formclasses.group} >
                    <label htmlFor="detail">Details</label>
                    <textarea
                        cols={5}
                        rows={5}
                        id='detail'
                        name='detail'
                        placeholder='Enter detail'
                        value={task.detail || ''}
                        onChange={(e) => handlechange(e)} />
                </div>
                <div className={taskclasses.group} >
                    <div className={formclasses.group}>
                        <label htmlFor="duedate">Duedate</label>
                        <input
                            type='date'
                            id='duedate'
                            name='duedate'
                            placeholder='Enter duedate'
                            value={task.duedate || ''}
                            onChange={(e) => handlechange(e)} />
                    </div>
                    <button type='submit' className='round'><FaRegSave /></button>
                    <button type='button' className='round' onClick={() => removeContainer()}><FaXmark /></button>
                </div>
            </form>
        </div>
    )
}

export default NewTask
