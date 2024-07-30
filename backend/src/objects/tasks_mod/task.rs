use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    name: String,
    content: String,
    importance: u8,
    status: u8
}

impl Task {
    pub fn new(name: String, content: String, importance: u8, status: u8) -> Task {
        return Task {
            name: name,
            content: content,
            importance: importance,
            status: status
        }
    }

    pub fn get_name(self) -> String {
        self.name
    }
}
