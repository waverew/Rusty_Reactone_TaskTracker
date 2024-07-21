import TaskChip from "./task-chip/TaskChip";
import "./TaskTable.css";
import { useState, useEffect } from "react";
const TaskTable = (props) => {

  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    setToDo(props.data.filter(prop => prop.status == 0));
    setInProgress(props.data.filter(prop => prop.status == 1));
    setReview(props.data.filter(prop => prop.status == 2));
    setFinished(props.data.filter(prop => prop.status == 3));
  }, [props.data]);

  const handleOnDrag = (e, chip) => {
    chip = JSON.stringify(chip);
    e.dataTransfer.setData("chip", chip);
  };

  const handleEndDrag = (chip, type) => {
    removeChipFromOrigin(chip, type);
  }

  const removeChipFromOrigin = (chip, type) => {
    switch (type) {
      case "progress": {
        inProgress.splice(inProgress.indexOf(chip), 1);
        setInProgress([...inProgress]);
        break;
      }
      case "todo": {
        toDo.splice(toDo.indexOf(chip), 1);
        setToDo([...toDo]);
        break;
      }
      case "review": {
        const updItems = [...review];
        updItems.splice(updItems.indexOf(chip), 1);
        setReview([...updItems]);
        break;
      }
      case "finished": {
        finished.splice(finished.indexOf(chip), 1);
        setFinished([...finished]);
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
        setInProgress([...inProgress, chip]);
        break;
      }
      case "todo": {
        setToDo([...toDo, chip]);
        break;
      }
      case "review": {
        setReview([...review, chip]);
        break;
      }
      case "finished": {
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
        <div className="justify-center d-flex table-title">TODO</div>
        <div className="justify-center d-flex">
          <div>
            {toDo.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
                onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "todo")}
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
        <div className="justify-center d-flex table-title">IN PROGRESS</div>
        <div className="justify-center d-flex">
          <div>
            {inProgress.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
                onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "progress")}
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
        <div className="justify-center d-flex table-title">REVIEW</div>
        <div className="justify-center d-flex">
          <div>
            {review.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
                onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "review")}
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
        <div className="justify-center d-flex table-title">FINISHED</div>
        <div className="justify-center d-flex">
          <div>
            {finished.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
                onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "finished")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskTable;
