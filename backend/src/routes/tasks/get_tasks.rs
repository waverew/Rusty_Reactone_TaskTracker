use crate::objects::tasks_mod::task::Task;
use axum::{Json};
pub struct TaskHandler { }

impl TaskHandler {
    pub async fn get() -> Json<Vec<Task>> {
        let task = Task::new("Hello world".to_string(), "Goodbye world".to_string(), 1, 1);
        let res = vec![task.clone(), task];
        Json(res)
    }
}