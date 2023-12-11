import { createContext } from "react";

export const tasksContext = createContext();
export const initialTasksState = [];

export function tasksReducer(state, action) {
    if (action.type === "ADDTASK") {
        return state?.length ? [...state, action.payload.task] : [action.payload.task];
    }
}