use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    title: String,
    content: String,
    importance: u8,
    status: u8
}

impl Task {
    pub fn new(title: String, content: String, importance: u8, status: u8) -> Task {
        return Task {
            title: title,
            content: content,
            importance: importance,
            status: status
        }
    }

    pub fn get_name(self) -> String {
        self.title
    }
}
