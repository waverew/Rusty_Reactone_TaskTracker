import { axiosClient } from "../axios";

export const getTasks = () => {
    return axiosClient.get("/api/tasks");
}
export const postTask = (task) => {
    return axiosClient.post("/api/tasks", task);
}
export const putTask = (task) => {
    return axiosClient.put("/api/tasks", task);
}
export const deleteTask = (task) => {
    return axiosClient.delete("/api/tasks", {data: task});
}
