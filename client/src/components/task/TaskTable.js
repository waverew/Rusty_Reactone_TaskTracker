import TaskChip from "./task-chip/TaskChip";
import TaskColumn from "./task-column/TaskColumn";
import "./TaskTable.css";
import { useState, useEffect } from "react";
const TaskTable = (props) => {
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    setToDo(props.data.filter((prop) => prop.status == 0));
    setInProgress(props.data.filter((prop) => prop.status == 1));
    setReview(props.data.filter((prop) => prop.status == 2));
    setFinished(props.data.filter((prop) => prop.status == 3));
  }, [props.data]);

  

  return (
    <div className="TaskTable">
      <TaskColumn tasks={toDo}
      typeNumber={0}
      typeName={"TODO"}
      statusChanged={props.statusChanged}
      deleteChip={props.deleteChip}
      editTask={props.editTask}></TaskColumn>
      <TaskColumn tasks={inProgress}
      typeNumber={1}
      typeName={"Progress"}
      deleteChip={props.deleteChip}
      statusChanged={props.statusChanged}
      editTask={props.editTask}></TaskColumn>
      <TaskColumn tasks={review}
      typeNumber={2}
      typeName={"Review"}
      deleteChip={props.deleteChip}
      statusChanged={props.statusChanged}
      editTask={props.editTask}></TaskColumn>
      <TaskColumn tasks={finished}
      typeNumber={3}
      typeName={"Finished"}
      deleteChip={props.deleteChip}
      statusChanged={props.statusChanged}
      editTask={props.editTask}></TaskColumn>
    </div>
  );
};
export default TaskTable;
