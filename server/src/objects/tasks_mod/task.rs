use serde::{Serialize, Deserialize};
use tokio_postgres::{Row};

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    title: String,
    content: String,
    importance: i16,
    status: i16,
    id: i64
}

impl From<Row> for Task {
    fn from(row: Row) -> Self {
        Self {
            title: row.get("title"),
            id: row.get("id"),
            content: row.get("content"),
            status: row.get("status"),
            importance: row.get("importance")
        }
    }
}

impl Task {
    pub fn new(title: String, content: String, importance: i16, status: i16, id: i64) -> Task {
        return Task {
            id: id,
            title: title,
            content: content,
            importance: importance,
            status: status
        }
    }

    pub fn get_title(&self) -> String {
        self.title.clone()
    }
    pub fn get_id(&self) -> i64 {
        self.id
    }
    pub fn get_content(&self) -> String {
        self.content.clone()
    }
    pub fn get_importance(&self) -> i16 {
        self.importance
    }
    pub fn get_status(&self) -> i16 {
        self.status
    }
}
