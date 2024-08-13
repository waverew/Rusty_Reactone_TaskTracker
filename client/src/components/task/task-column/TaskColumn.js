import "./TaskColumn.css";
import { useState, useEffect } from "react";
import TaskChip from "../task-chip/TaskChip";
const TaskColumn = (props) => {
  const [chips, setChips] = useState([]);

  useEffect(() => {
    setChips(props.tasks);
  }, [props.tasks]);

  const handleOnDrop = (e, status) => {
    removeDragTableClass();
    const chip = JSON.parse(e.dataTransfer.getData("chip"));
    props.statusChanged(chip, status);
    setChips([...chips, chip]);
  };

  const handleEndDrag = (chip) => {
    removeDragTableClass();
  };

  const handleOnDrag = (e, chip) => {
    addDragTableClass();
    chip = JSON.stringify(chip);
    e.dataTransfer.setData("chip", chip);
  };

  const addDragTableClass = () => {
    const tables = document.getElementsByClassName("table-dyn-drag");
    for (let i = 0; i < tables.length; i++) {
      tables[i].classList.add("task-table-inner-drag");
    }
  };

  const deleteChip = (chip) => {
    props.deleteChip(chip);
  };

  const removeDragTableClass = () => {
    const tables = document.getElementsByClassName("table-dyn-drag");
    for (let i = 0; i < tables.length; i++) {
      tables[i].classList.remove("task-table-inner-drag");
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="TaskColumn">
      <div className="justify-center d-flex table-title">{props.typeName}</div>
      <div
        className="justify-center d-flex table-dyn-drag"
        onDrop={(e) => handleOnDrop(e, props.typeNumber)}
        onDragOver={handleOnDragOver}
      >
        <div className="scroll-container">
          {chips.map((data, i) => (
            <TaskChip
              key={i}
              data={data}
              deleteChip={deleteChip}
              onDragStart={(e) => handleOnDrag(e, data)}
              onDragEnd={(e) => handleEndDrag(data)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
