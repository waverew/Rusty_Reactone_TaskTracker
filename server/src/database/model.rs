use crate::objects::tasks_mod::task::Task;
use futures::FutureExt;
use tokio::net::TcpStream;
use tokio_postgres::tls::{NoTls, NoTlsStream};
use tokio_postgres::{Client, Config, Connection, Error, SimpleQueryMessage};

pub async fn get_tasks() -> Result<Vec<Task>, Error> {
    let client = get_client().await;
    let rows = client.query("SELECT * from tasks;", &[]).await?;
    let res: Vec<Task> = rows.into_iter().map(|row| Task::from(row)).collect();
    Ok(res)
}

pub async fn add_task(task: &Task) -> Result<(), Error> {
    let client = get_client().await;
    let query_string = 
        format!("INSERT INTO tasks (title, content, importance, status) VALUES ('{0}', '{1}', '{2}', '{3}');",
        task.get_title(), task.get_content(), task.get_importance(), task.get_status());
    client.query(&query_string, &[]).await?;
    Ok(())
}

async fn connect_raw(s: &str) -> Result<(Client, Connection<TcpStream, NoTlsStream>), Error> {
    let socket = TcpStream::connect("localhost:5432").await.unwrap();
    let config = s.parse::<Config>().unwrap();
    config.connect_raw(socket, NoTls).await
}

async fn connect(s: &str) -> Client {
    let (client, connection) = connect_raw(s).await.unwrap();
    let connection = connection.map(|r| r.unwrap());
    tokio::spawn(connection);
    client
}

async fn get_client() -> Client {
    connect("host=localhost port=5432 password='mysecretpassword' user=postgres sslmode=disable").await
}