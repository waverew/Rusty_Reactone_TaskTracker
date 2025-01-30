import TaskTable from "../task/TaskTable";
import LeftMenu from "../common/LeftMenu";
import AddTaskModal from "../task/task-add-modal/AddTaskModal";
import EditTaskModal from "../task/task-edit/EditTaskModal";
import "./MainView.css";
import { useState, useEffect, useRef } from "react";
import { TaskService } from "../../services";

const MainView = (props) => {
  const addTaskModalRef = useRef(null);
  const editTaskModalRef = useRef(null);
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [chipToEdit, setChipToEdit] = useState(null); 
  useEffect(() => {
    setShowAddModal(false);
    TaskService.getTasks()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const addTask = (task) => {
    setData([...data, task]);
    TaskService.addTask(task)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  const deleteTask = (deletedChip) => {
    console.log(deletedChip);
    const index = getIndex(deletedChip);
    if (index !== -1) {
      data.splice(index, 1);
      setData([...data]);
    }
    TaskService.deleteTask(deletedChip)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  const editTask = (editedTask) => {
    setChipToEdit(editedTask);
    editTaskModalRef.current.toggle();
    editTaskModalRef.current.setDataForEdit(editedTask);
  }

  const handleDialogState = (type) => {
    switch (type) {
      case 0:
        addTaskModalRef.current.toggle();
        break;
      default: {
        break;
      }
    }
  }

  const statusChanged = (chip, status) => {
    const index = getIndex(chip);
    if (index !== -1) {
      data[index].status = status;
      const newChip = data[index];
      data.splice(index, 1);
      setData([...data, newChip]);
    }
  };

  const saveEditedTask = (chip) => {
    const index = getIndex(chipToEdit);
    if (index !== -1) {
      data[index] = chip;
      setData([...data]);
    }
    TaskService.editTask(chip)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  } 

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
        ref={editTaskModalRef}
        editTask={saveEditedTask}
        chip={chipToEdit}
      />
    </div>
  );
};
export default MainView;
