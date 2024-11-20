import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NewTask,
  TTask,
  AddTaskResponse,
  DeleteTaskResponse,
  TGetUserArgs,
  EditTaskResponse,
  TEditUserArgs,
} from "../types";
// import { RootState } from "./indexStore";
import { addTask, deleteTask, editTask, getTasks } from "../api/tasks";

interface TasksState {
  tasks: TTask[];
  error: string | null;
}
const initialState: TasksState = {
  tasks: [],
  error: null,
};

export const getUserTasks = createAsyncThunk<TTask[], TGetUserArgs>(
  "tasks/getUserTasks",
  async ({ month, year }) => {
    const response = await getTasks(month, year);
    return await response.data.tasks;
  }
);
export const addUserTasks = createAsyncThunk<
  AddTaskResponse,
  NewTask,
  { rejectValue: string }
>("tasks/addUserTasks", async (newTask, { rejectWithValue }) => {
  try {
    const response = await addTask(newTask);
    return await response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to add the task. Please try again.");
  }
});
export const deleteUserTask = createAsyncThunk<DeleteTaskResponse, string>(
  "tasks/deleteUserTask",
  async (id) => {
    const response = await deleteTask(id);
    return await response.data;
  }
);
export const editUserTask = createAsyncThunk<
  EditTaskResponse["task"],
  TEditUserArgs
>("tasks/editUserTask", async ({ taskId, updatedTask }) => {
  const response = await editTask(taskId, updatedTask);
  return await response.data.task;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearAddTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserTasks.fulfilled,
      (state, action: PayloadAction<TTask[]>) => {
        state.tasks = action.payload;
      }
    );
    builder.addCase(
      addUserTasks.fulfilled,
      (state, action: PayloadAction<AddTaskResponse>) => {
        state.tasks.push(action.payload.task);
      }
    );
    builder.addCase(addUserTasks.rejected, (state, action) => {
      state.error =
        action.payload || "An error occurred while adding the task.";
    });
    builder.addCase(
      deleteUserTask.fulfilled,
      (state, action: PayloadAction<DeleteTaskResponse>) => {
        state.tasks = state.tasks.filter(
          (item) => item.id !== action.payload.plan.id
        );
      }
    );
    builder.addCase(
      editUserTask.fulfilled,
      (state, action: PayloadAction<EditTaskResponse["task"]>) => {
        state.tasks = state.tasks.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      }
    );
  },
});

export default tasksSlice;
export const tasksSliceAction = tasksSlice.actions;
