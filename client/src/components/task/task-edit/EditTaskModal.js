import "./EditTaskModal.css";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

const EditTaskModal = forwardRef((props, ref) => {
  const dialogRef = useRef(null);
  const [titleInpVal, setTitleInpVal] = useState("");
  const [contentInpVal, setContentInpVal] = useState("");
  const [status, setStatus] = useState(null);
  const importanceTypes = ["низкая", "средняя", "высокая"];
  const checkBoxes = useRef([null, null, null]);

  useImperativeHandle(ref, () => ({
    toggle() {
      toggleDialog();
    },
    setDataForEdit(editedChip) {
      checkBoxes.current.forEach(checkBox => checkBox.checked = false);
      setTimeout(() => {
        setContentInpVal(editedChip.content);
        setTitleInpVal(editedChip.title);
        setImportanceCheckboxes(editedChip.importance);
        setStatus(editedChip.status);
      });
    }
  }));

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
    let importance = getImportanceVal();
    
    const data = {
      title: titleInpVal,
      content: contentInpVal,
      importance: importance,
      status: status,
    };
    props.editTask(data);
    toggleDialog();
  };

  const handleChangeCheckbox = (event) => {
    const cb = event.target;
    for (var i = 0; i < checkBoxes.current.length; i++) {
      checkBoxes.current[i].checked = false;
    }
    cb.checked = true;
  };

  const toggleDialog = () => {
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const getImportanceVal = () => {
    for (var i = 0; i < checkBoxes.current.length; i++) {
      if (checkBoxes.current[i].checked === true) {
        if (checkBoxes.current[i].name === "низкая") {
          return 0;
        } else if (checkBoxes.current[i].name === "средняя") {
          return 1;
        } else if (checkBoxes.current[i].name === "высокая") {
          return 2;
        }
      }
    }
    return 0;
  }

  const setImportanceCheckboxes = (importance) => {
    debugger
    switch (importance) {
      case 0: {
        checkBoxes.current[0].checked = true;
        break;
      }
      case 1: {
        checkBoxes.current[1].checked = true;
        break;
      }
      case 2: {
        checkBoxes.current[2].checked = true;
        break;
      }
      default: {
        checkBoxes.current[0].checked = true;
        break;
      }
    }
  }

  return (
    <dialog ref={dialogRef} className="AddTaskModal">
      <div className="close-modal-wrap d-flex">
        <div className="close-modal" onClick={() => toggleDialog()}>
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
              <div>
                <input
                  ref={el => checkBoxes.current[i] = el}
                  type="radio"
                  name={importance}
                  className="cb"
                  onChange={handleChangeCheckbox}
                />
              </div>
              <label>{importance}</label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={saveTask}>Сохранить</button>
    </dialog>
  );
});

export default EditTaskModal;
