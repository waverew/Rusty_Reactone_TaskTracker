import TaskChip from "./task-chip/TaskChip";
import "./TaskTable.css";
import { useState } from "react";
const TaskTable = (props) => {
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [finished, setFinished] = useState([]);
  const handleOnDrag = (e, chip) => {};

  const handleOnDrop = (e, type) => {};
  return (
    <div className="TaskTable">
      <div className="task-table-inner" onDrop={(e) => handleOnDrop(e, "todo")}>
        <div className="justify-center d-flex">TODO</div>
        {toDo.map((data) => (
          <div draggable onDragStart={handleOnDrag}>
            <TaskChip data={data} />
          </div>
        ))}
      </div>
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "progress")}
      >
        <div className="justify-center d-flex">IN PROGRESS</div>
        <div className="justify-center d-flex">
          <div>
            {inProgress.map((data) => (
              <div draggable onDragStart={handleOnDrag}>
                <TaskChip data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "review")}
      >
        <div className="justify-center d-flex">REVIEW</div>
        {review.map((data) => (
          <div draggable onDragStart={handleOnDrag}>
            <TaskChip data={data} />
          </div>
        ))}
      </div>
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "finished")}
      >
        <div className="justify-center d-flex">DONE</div>
        {finished.map((data) => (
          <div draggable onDragStart={handleOnDrag}>
            <TaskChip data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TaskTable;
