import instance from "./axios";
import {
  NewTask,
  AddTaskResponse,
  GetTaskResponse,
  EditTaskResponse,
} from "../types";
import { AxiosResponse } from "axios";

export function getTasks(
  currentMonth: number,
  year: number
): Promise<AxiosResponse<GetTaskResponse>> {
  const params = new URLSearchParams();
  params.append("month", currentMonth.toString());
  params.append("year", year.toString());
  return instance.get("/", { params });
}
export function deleteTask(taskId: string) {
  return instance.delete(`/${taskId}`);
}
export function addTask(
  newTask: NewTask
): Promise<AxiosResponse<AddTaskResponse>> {
  return instance.post("/add", newTask);
}

export function editTask(
  taskId: string,
  updatedTask: { title: string; description: string }
): Promise<AxiosResponse<EditTaskResponse>> {
  return instance.put(`/${taskId}`, updatedTask);
}
