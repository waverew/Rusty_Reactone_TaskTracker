import TaskChip from "./task-chip/TaskChip";
import "./TaskTable.css";
const TaskTable = (props) => {
  return (
    <div className="TaskTable">
      <div className="task-table-inner">
        <div className="justify-center d-flex">TODO</div>
      </div>
      <div className="task-table-inner">
        <div className="justify-center d-flex">IN PROGRESS</div>
        <div className="justify-center d-flex">
          <div>
            {props.data.map((data) => (
              <TaskChip data={data} />
            ))}
          </div>
        </div>
      </div>
      <div className="task-table-inner">
        <div className="justify-center d-flex">REVIEW</div>
      </div>
      <div className="task-table-inner">
        <div className="justify-center d-flex">DONE</div>
      </div>
    </div>
  );
};
export default TaskTable;
