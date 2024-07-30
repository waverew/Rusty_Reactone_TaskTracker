import { axiosClient } from "../axios";

export const getTasks = () => {
    return axiosClient.get("/api/tasks");
}