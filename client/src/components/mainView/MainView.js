import TaskTable from "../task/TaskTable";
import LeftMenu from "../common/LeftMenu";
import AddTaskModal from "../task/task-add-modal/AddTaskModal";
import EditTaskModal from "../task/task-edit/EditTaskModal";
import "./MainView.css";
import { useState, useEffect, useRef } from "react";
import { TaskService } from "../../services";

const MainView = (props) => {
  const addTaskModalRef = useRef(null);
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    setShowAddModal(false);
    TaskService.getTasks()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log(showAddModal);
  }, showAddModal)

  const addTask = (task) => {
    setData([...data, task]);
  };

  const deleteTask = (deletedChip) => {
    const index = getIndex(deletedChip);
    if (index != -1) {
      data.splice(index, 1);
      setData([...data]);
    }
  };

  const editTask = (editedTask) => {
    const index = getIndex(editedTask);
    console.log("sasdas")
  }

  const handleDialogState = (type) => {
    switch (type) {
      case 0:
        addTaskModalRef.current.toggle();
        break;
    }
  }

  const statusChanged = (chip, status) => {
    const index = getIndex(chip);
    if (index != -1) {
      data[index].status = status;
      const newChip = data[index];
      data.splice(index, 1);
      setData([...data, newChip]);
    }
  };

  const getIndex = (chip) => {
    for (let i = 0; i < data.length; i++) {
      if (Object.keys(chip).every((k) => chip[k] === data[i][k])) {
        return i;
      }
    }
    return -1;
  };

  return (
    <div className="MainView">
      <LeftMenu handleDialogState={handleDialogState}></LeftMenu>
      <TaskTable
        deleteChip={deleteTask}
        data={data}
        show={showAddModal}
        statusChanged={statusChanged}
        editTask={editTask}
      />
      <AddTaskModal
        ref={addTaskModalRef}
        addTask={addTask}
      />
      <EditTaskModal
      />
    </div>
  );
};
export default MainView;
