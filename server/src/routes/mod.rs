mod handlers;
use axum::{
    headers::Authorization,
    http::header::CONTENT_TYPE,
    http::Method,
    routing::{get, post},
    Extension, Router, TypedHeader,
};
use tower_http::cors::{Any, CorsLayer};
use handlers::tasks::{get as t_get, put as t_put, post as t_post};


#[derive(Clone)]
pub struct SharedData {
    pub message: String,
}

pub fn create_route() -> Router {
    let cros = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([CONTENT_TYPE])
        .allow_origin(Any);
    let shared_data = SharedData {
        message: "Hello from Shared Data".to_owned(),
    };
    Router::new()
        .route("/api/tasks", get(t_get).post(t_post))
        .layer(cros)
        .layer(Extension(shared_data))
}