import { axiosClient } from "../axios";

export const getTasks = () => {
    return axiosClient.get("/api/tasks");
}
export const postTask = (task) => {
    return axiosClient.post("/api/tasks", task);
}