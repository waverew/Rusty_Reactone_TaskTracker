mod routes;
mod objects;

use routes::create_route;

#[tokio::main]
async fn main() {
    let app = create_route();
    let host = "0.0.0.0:44365";

    axum::Server::bind(&host.parse().unwrap()).serve(app.into_make_service()).await.unwrap();
}