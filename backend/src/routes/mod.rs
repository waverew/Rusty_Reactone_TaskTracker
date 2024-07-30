mod tasks;
use axum::{
    headers::Authorization,
    http::Method,
    routing::{get, post},
    Extension, Router, TypedHeader,
};
use tower_http::cors::{Any, CorsLayer};
use tasks::get_tasks::TaskHandler;


#[derive(Clone)]
pub struct SharedData {
    pub message: String,
}

pub fn create_route() -> Router {
    let cros = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);
    let shared_data = SharedData {
        message: "Hello from Shared Data".to_owned(),
    };
    Router::new()
        .route("/api/tasks", get(TaskHandler::get))
        .layer(cros)
        .layer(Extension(shared_data))
}