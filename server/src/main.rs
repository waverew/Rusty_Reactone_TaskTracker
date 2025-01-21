#![allow(dead_code)]
#![allow(unused_imports)]
mod routes;
mod objects;
mod database;

use routes::create_route;

#[tokio::main]
async fn main() {
    let app = create_route();
    let host = "0.0.0.0:44365";
    println!("server is running on http://{}", host);

    axum::Server::bind(&host.parse().unwrap()).serve(app.into_make_service()).await.unwrap();
}