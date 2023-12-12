import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

import { useContext, useEffect, useState } from "react";

import { db } from "@/firebase";
import Task from "@/components/Task";
import { tasksContext } from "@/store/tasks";
import { authContext } from "@/store/auth";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";

import { LiaTrashRestoreSolid } from "react-icons/lia";
import { MdDeleteSweep } from "react-icons/md";

import tasksclasses from "../styles/tasks.module.css";

const bin = () => {
    const { authState } = useContext(authContext);
    const { tasksState, tasksDispatch } = useContext(tasksContext);
    const [tasks, setTasks] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setTasks(tasksState.filter(task => task.isBinned));
    }, [tasksState]);

    const handleRestoreAll = () => {
        tasks.forEach(async (task) => {
            await setDoc(doc(collection(db, authState.uid), task.uid || task.assignTime), { ...task, isBinned: false })
                .then(() => {
                    tasksDispatch({
                        type: "UPDATETASK",
                        payload: {
                            task: { ...task, isBinned: false },
                        }
                    })
                    setAlert({ message: "All tasks restored successfully", type: 'yellow' });
                }).catch(error => {
                    setAlert({ message: error.message, type: 'red' });
                    console.error(error);
                });
        })
    }

    const handleEmptyBIn = () => {
        tasks.forEach(async (task) => {
            await deleteDoc(doc(db, authState.uid, task.uid || task.assignTime))
                .then(() => {
                    tasksDispatch({
                        type: "DELETETASK",
                        payload: { task }
                    });
                    setAlert({ message: "All tasks deleted successfully", type: 'red' });
                })
                .catch(error => {
                    setAlert({ message: error.message, type: 'red' });
                    console.error(error);
                });
        })
    }

    return (
        <>
            <h1>Recycle Bin</h1>
            <section>
                <button onClick={handleRestoreAll}><LiaTrashRestoreSolid />Restore all</button>
                <button onClick={handleEmptyBIn}><MdDeleteSweep />Empty Bin</button>
            </section>
            <div className={tasksclasses.container}>
                {tasks?.length ? tasks.map(task => {
                    <Task {...task} key={task.uid || task.assignTime} />
                }) : (tasks ? < Loading /> : <div>There is no task</div>)}
            </div>
            {alert && <Alert {...alert} setAlert={setAlert} />}
        </>
    )
}

export default bin;