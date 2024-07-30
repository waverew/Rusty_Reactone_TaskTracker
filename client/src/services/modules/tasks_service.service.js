import { TasksApi } from "../../api";

export async function getTasks() {
    const { data } = await TasksApi.getTasks();
    return data;
}