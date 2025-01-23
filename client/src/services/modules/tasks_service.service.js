import { TasksApi } from "../../api";

export async function getTasks() {
    const { data } = await TasksApi.getTasks();
    return data;
}

export async function addTask(task) {
    const req = {
        id: 0,
        title: task.title,
        content: task.content,
        importance: task.importance,
        status: task.status,
      };
    const { data } = await TasksApi.postTask(req);
    return data;
}