import "./AddTaskModal.css";
import { useRef, useEffect, useState } from "react";

const AddTaskModal = (props) => {
  const dialogRef = useRef(null);
  const [titleInpVal, setTitleInpVal] = useState("");
  const [contentInpVal, setContentInpVal] = useState("");
  const importanceTypes = ["низкая", "средняя", "высокая"];

  useEffect(() => {
    props.setDialogRef(dialogRef);
    setContentInpVal("");
    setTitleInpVal("");
    document.getElementsByName("низкая")[0].checked = true;
    document.getElementsByName("средняя")[0].checked = false;
    document.getElementsByName("высокая")[0].checked = false;
  }, [props]);

  const handleChange = (e, type) => {
    switch (type) {
      case "title": {
        setTitleInpVal(e.target.value);
        break;
      }
      case "content": {
        setContentInpVal(e.target.value);
        break;
      }
      default:
        return;
    }
  };

  const saveTask = () => {
    let importance = 0;
    let cbs = document.getElementsByClassName("cb");
    for (var i = 0; i < cbs.length; i++) {
      if (cbs[i].checked === true) {
        if (cbs[i].name === "низкая") {
          importance = 0;
        } else if (cbs[i].name === "средняя") {
          importance = 1;
        } else if (cbs[i].name === "высокая") {
          importance = 2;
        }
      }
    }
    const data = {
      title: titleInpVal,
      content: contentInpVal,
      importance: importance,
      status: 0,
    };
    props.addTask(data);
    props.toggleDialog();
  };

  const handleChangeCheckbox = (event) => {
    const cb = event.target;
    var cbs = document.getElementsByClassName("cb");
    for (var i = 0; i < cbs.length; i++) {
      cbs[i].checked = false;
    }
    cb.checked = true;
  };

  return (
    <dialog ref={dialogRef} className="AddTaskModal">
      <div className="close-modal-wrap d-flex">
        <div className="close-modal" onClick={props.toggleDialog}>
          x
        </div>
      </div>
      <div className="task-modal-input-container">
        <div className="inp-wrap align-center">
          <div className="field-tag">Название:</div>
          <input
          className="name-input"
            type="text"
            value={titleInpVal}
            onChange={(e) => handleChange(e, "title")}
          />
        </div>
        <div className="task-modal-input-container">
          <div className="inp-wrap ">
            <div className="field-tag">Содержание:</div>
            <textarea rows={4}
              cols={30}
              value={contentInpVal}
              onChange={(e) => handleChange(e, "content")}
            />
          </div>
        </div>
        <div className="task-modal-input-container d-flex dynamic-wrap">
          <div className="field-tag">Важность:</div>
          {importanceTypes.map((importance, i) => (
            <div key={i} className="inp-wrap align-center radio-wrap">
              <label>{importance}</label>
              <div>
                <input
                  type="radio"
                  name={importance}
                  className="cb"
                  onChange={handleChangeCheckbox}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={saveTask}>Сохранить</button>
    </dialog>
  );
};

export default AddTaskModal;
