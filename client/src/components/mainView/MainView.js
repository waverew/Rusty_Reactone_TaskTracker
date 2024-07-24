import TaskTable from "../task/TaskTable";
import LeftMenu from "../common/LeftMenu";
import AddTaskModal from "../task/task-modal/AddTaskModal";
import "./MainView.css";
import { useState } from "react";

const MainView = (props) => {
  const [modalRef, setModalRef] = useState(null);
  const [data, setData] = useState([
    {
      title: "Hellow",
      content: "Lorem ipsum lorem upsum",
      importance: 1,
      status: 0,
    },
    {
      title: "Hellow nogga",
      content: "Lorem ipsum lorem upsum",
      importance: 1,
      status: 2,
    },
  ]);

  const setTaskModalRef = (dialogRef) => {
    setModalRef(dialogRef);
  }

  const toggleDialog = () => {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.hasAttribute("open")
      ? modalRef.current.close()
      : modalRef.current.showModal();
  };

  const addTask = (task) => {
    setData([...data, task]);
  };
  return (
    <div className="MainView">
      <LeftMenu onAddTask={toggleDialog}></LeftMenu>
      <TaskTable data={data} />
      <AddTaskModal setDialogRef={setTaskModalRef}
      addTask={addTask}
      toggleDialog={toggleDialog}/>
    </div>
  );
};
export default MainView;
