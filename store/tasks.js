import { createContext } from "react";

export const tasksContext = createContext();
export const initialTasksState = [];

export function tasksReducer(state, action) {
    if (action.type === "ADDTASK") {
        const newState = state?.length ? [...state, { ...action.payload.task }] : [{ ...action.payload.task, }]
        newState.sort((a, b) => (new Date(a.duedate).getTime()) - new Date(b.duedate).getTime());
        return newState;
    }

    if (action.type === "UPDATETASK") {
        const newState = [...state.filter(task => task.uid !== action.payload.task.uid), { ...action.payload.task }];
        newState.sort((a, b) => (new Date(a.duedate).getTime()) - new Date(b.duedate).getTime());
        return newState;
    }

    if (action.type === "DELETETASK") {
        const newState = state.filter(task => task.uid !== action.payload.task.uid);
        newState.sort((a, b) => (new Date(a.duedate).getTime()) - new Date(b.duedate).getTime());
        return newState;
    }
}