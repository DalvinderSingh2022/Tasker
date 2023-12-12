import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase';

import { useContext, useState } from 'react';

import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { authContext } from '@/store/auth';
import { tasksContext } from '@/store/tasks';

import authclasses from "../styles/auth.module.css";
import taskclasses from "../styles/task.module.css";

const NewTask = ({ removeContainer }) => {
    const { tasksDispatch } = useContext(tasksContext);
    const { authState } = useContext(authContext);
    const [task, setTask] = useState({
        title: null,
        detail: null,
        duedate: null,
        assignTime: (new Date()).getTime(),
        isBinned: false,
        status: "to do"
    });

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!task.title || !task.detail || !task.duedate) {

        } else {
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
    }

    return (
        <div className="globalBox">
            <div className={taskclasses.container}>
                <form className={authclasses.form} onSubmit={(e) => handlesubmit(e)}>
                    <div className={authclasses.group} >
                        <label htmlFor="title">Title</label>
                        <input
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
                                type='date'
                                id='duedate'
                                name='duedate'
                                placeholder='Enter duedate'
                                value={task.duedate || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>
                        <button type='submit' className='round long blue'><FaPlus />Add</button>
                        <button type='button' className='round long red' onClick={() => removeContainer()}><FaXmark />close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTask;