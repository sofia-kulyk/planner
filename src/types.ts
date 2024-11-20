export type TTask = {
  day: string;
  description: string;
  id: string;
  month: string;
  priority: string;
  status: string;
  title: string;
  year: string;
  _id: string;
};
export type NewTask = {
  title: string;
  description: string;
  month: number;
  year: number;
  day: number | null;
};
export type AddTaskResponse = {
  message: string;
  task: TTask;
};
export type GetTaskResponse = {
  message: string;
  tasks: TTask[];
};

export type DeleteTaskResponse = {
  message: string;
  plan: TTask;
};

export interface TGetUserArgs {
  month: number;
  year: number;
}
export type EditTaskResponse = {
  message: string;
  task: TTask;
};

export type TEditUserArgs = {
  taskId: string;
  updatedTask: { title: string; description: string };
};
export type DefaultTask = {
  title: string;
  description: string;
  status: string;
};
