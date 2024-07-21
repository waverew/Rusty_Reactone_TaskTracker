import TaskChip from "./task-chip/TaskChip";
import "./TaskTable.css";
import { useState } from "react";
const TaskTable = (props) => {
  const [toDo, setToDo] = useState(props.data);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [finished, setFinished] = useState([]);
  const [origin, setOrigin] = useState("");

  const handleOnDrag = (e, chip, type) => {
    setOrigin(type);
    chip = JSON.stringify(chip);
    e.dataTransfer.setData("chip", chip);
  };

  const removeChipFromOrigin = (chip) => {
    const type = origin;
    switch (type) {
      case "progress": {
        inProgress.splice(inProgress.indexOf(chip), 1);
        setInProgress(inProgress);
        break;
      }
      case "todo": {
        toDo.splice(toDo.indexOf(chip), 1);
        setToDo(toDo);
        break;
      }
      case "review": {
        review.splice(review.indexOf(chip), 1);
        setReview(review);
        break;
      }
      case "finished": {
        finished.splice(finished.indexOf(chip), 1);
        setFinished(finished);
        break;
      }
      default:
        break;
    }
  };

  const handleOnDrop = (e, type) => {
    const chip = JSON.parse(e.dataTransfer.getData("chip"));
    switch (type) {
      case "progress": {
        removeChipFromOrigin(chip);
        setInProgress([...inProgress, chip]);
        break;
      }
      case "todo": {
        removeChipFromOrigin(chip);
        setToDo([...toDo, chip]);
        break;
      }
      case "review": {
        removeChipFromOrigin(chip);
        setReview([...review, chip]);
        break;
      }
      case "finished": {
        removeChipFromOrigin(chip);
        setFinished([...finished, chip]);
        break;
      }
      default:
        break;
    }
  };
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="TaskTable">
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "todo")}
        onDragOver={handleOnDragOver}
      >
        <div className="justify-center d-flex">TODO</div>
        <div className="justify-center d-flex">
          <div>
            {toDo.map((data) => (
              <TaskChip
                data={data}
                onDragStart={(e) => handleOnDrag(e, data, "todo")}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "progress")}
        onDragOver={handleOnDragOver}
      >
        <div className="justify-center d-flex">IN PROGRESS</div>
        <div className="justify-center d-flex">
          <div>
            {inProgress.map((data) => (
              <TaskChip
                data={data}
                onDragStart={(e) => handleOnDrag(e, data, "progress")}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "review")}
        onDragOver={handleOnDragOver}
      >
        <div className="justify-center d-flex">REVIEW</div>
        <div className="justify-center d-flex">
          <div>
            {review.map((data) => (
              <TaskChip
                data={data}
                onDragStart={(e) => handleOnDrag(e, data, "review")}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner"
        onDrop={(e) => handleOnDrop(e, "finished")}
        onDragOver={handleOnDragOver}
      >
        <div className="justify-center d-flex">FINISHED</div>
        <div className="justify-center d-flex">
          <div>
            {finished.map((data) => (
              <TaskChip
                data={data}
                onDragStart={(e) => handleOnDrag(e, data, "finished")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskTable;
