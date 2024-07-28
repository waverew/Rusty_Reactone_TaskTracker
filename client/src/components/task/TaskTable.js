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
	addDragTableClass();
    chip = JSON.stringify(chip);
    e.dataTransfer.setData("chip", chip);
  };

  const handleEndDrag = (chip, type) => {
	  removeDragTableClass();
    removeChipFromOrigin(chip, type);
  }

	const addDragTableClass = () => {
		const tables = document.getElementsByClassName("table-dyn-drag");	
		for (let i = 0; i < tables.length; i++) {
			tables[i].classList.add("task-table-inner-drag");
		}
	}

	const removeDragTableClass = () => {
		const tables = document.getElementsByClassName("table-dyn-drag");	
		for (let i = 0; i < tables.length; i++) {
			tables[i].classList.remove("task-table-inner-drag");
		}
	}

	const deleteChip = (chip) => {
		props.deleteChip(chip);	
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

  const handleOnDrop = (e, type, status) => {
    const chip = JSON.parse(e.dataTransfer.getData("chip"));
    props.statusChanged(chip, status);
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
        className="task-table-inner">
        <div className="justify-center d-flex table-title">TODO</div>
	<div className="justify-center d-flex table-dyn-drag" onDrop={(e) => handleOnDrop(e, "todo", 0)}
        onDragOver={handleOnDragOver}>

          <div>
            {toDo.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
		deleteChip={deleteChip}
                onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "todo")}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner">
        <div className="justify-center d-flex table-title">IN PROGRESS</div>
        <div className="justify-center d-flex table-dyn-drag" onDrop={(e) => handleOnDrop(e, "progress", 1)}
        onDragOver={handleOnDragOver}>
          <div>
            {inProgress.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
		deleteChip={deleteChip}
                onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "progress")}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner">
        <div className="justify-center d-flex table-title">REVIEW</div>
        <div className="justify-center d-flex table-dyn-drag" onDrop={(e) => handleOnDrop(e, "review", 2)}
        onDragOver={handleOnDragOver}>
          <div>
            {review.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
                deleteChip={deleteChip}
		onDragStart={(e) => handleOnDrag(e, data)}
                onDragEnd={e => handleEndDrag(data, "review")}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="task-table-inner">
        <div className="justify-center d-flex table-title">FINISHED</div>
        <div className="justify-center d-flex table-dyn-drag" onDrop={(e) => handleOnDrop(e, "finished", 3)}
        onDragOver={handleOnDragOver}>
          <div>
            {finished.map((data, i) => (
              <TaskChip
                key={i}
                data={data}
                deleteChip={deleteChip}
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
