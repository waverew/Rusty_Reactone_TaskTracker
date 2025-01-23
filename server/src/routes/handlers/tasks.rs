use crate::objects::tasks_mod::task::Task;
use crate::database::model::{get_tasks, add_task};
use tokio_postgres::{Error};
use axum::{Json};
use axum::extract;

pub async fn get() -> Json<Vec<Task>> {
    let tasks = get_tasks().await;
    match tasks {
        Ok(res) => Json(res),
        Err(_err) => Json(vec![])
    }
    
}

pub async fn put(extract::Json(payload): extract::Json<Task>) {
    
}

pub async fn post(extract::Json(mut payload): extract::Json<Task>) -> Json<i32> {
    println!("{}", payload.get_id());
    let x = add_task(&payload).await;
    match x {
        Ok(z) => println!("ok"),
        Err(err) => println!("{}", err)
    }
    Json(0)
}