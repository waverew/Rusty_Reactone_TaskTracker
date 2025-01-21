use crate::objects::tasks_mod::task::Task;
use crate::database::model::{get_conn};
use axum::{Json};
use axum::extract;

pub async fn get() -> Json<Vec<Task>> {
    let task = Task::new("Hello world".to_string(), "Goodbye world".to_string(), 1, 1, 1);
    let task_two = Task::new("Hello night".to_string(), "no peace".to_string(), 2, 2, 2);
    let res = vec![task, task_two];
    let x = get_conn().await;
    match x {
        Ok(s) => {
            println!("{}", "ok");
        },
        Err(err) => {
            println!("{}", err);
        }
    }
    Json(res)
}

pub async fn put(extract::Json(payload): extract::Json<Task>) {
    
}

pub async fn post(extract::Json(payload): extract::Json<Task>) {
    
}