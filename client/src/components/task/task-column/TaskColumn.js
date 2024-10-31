import "./TaskColumn.css";
import { useState, useEffect } from "react";
import TaskChip from "../task-chip/TaskChip";
const TaskColumn = (props) => {
  const [chips, setChips] = useState([]);

  useEffect(() => {
    setChips(props.tasks);
    
  }, [props.tasks]);

  const handleOnDrop = (e, status) => {
    const chip = JSON.parse(e.dataTransfer.getData("chip"));
    props.statusChanged(chip, status);
    setChips([...chips, chip]);
  };

  const handleOnDrag = (e, chip) => {
    chip = JSON.stringify(chip);
    e.dataTransfer.setData("chip", chip);
  };

  const deleteChip = (chip) => {
    props.deleteChip(chip);
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
              editTask={props.editTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
