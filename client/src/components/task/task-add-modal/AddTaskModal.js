import "./AddTaskModal.css";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

const AddTaskModal = forwardRef((props, ref) => {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const checkBoxes = useRef([null, null, null]);
  const [titleInpVal, setTitleInpVal] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [contentInpVal, setContentInpVal] = useState("");
  const importanceTypes = ["низкая", "средняя", "высокая"];

  useEffect(() => {
    setContentInpVal("");
    setTitleInpVal("");
    checkBoxes.current.forEach(checkBox => checkBox.checked = false);
    checkBoxes.current[0].checked = true;
  }, [props]);

  useImperativeHandle(ref, () => ({
    toggle() {
      toggleDialog();
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
    if (validateInputs()) {
      return;
    }
    let importance = getImportanceVal();
    const data = {
      title: titleInpVal,
      content: contentInpVal,
      importance: importance,
      status: 0,
    };
    props.addTask(data);
    
    toggleDialog();
  };

  const validateInputs = () => {
    if (!titleInpVal) {
      titleRef.current.classList.add('invalid');
      setInvalid(true);
    } else {
      titleRef.current.classList.remove('invalid');
    }
    if (!contentInpVal) {
      contentRef.current.classList.add('invalid');
      setInvalid(true);
    } else {
      contentRef.current.classList.remove('invalid');
    }
    if (titleInpVal && contentInpVal) {
      setInvalid(false);
      return false;
    } else {
      return true;
    }
  }

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
            ref={titleRef}
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
              ref={contentRef}
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
      {invalid && <div className="warning">Не заполнены обязательные поля</div>}
      <button onClick={saveTask} className="button-standard">Сохранить</button>
    </dialog>
  );
});

export default AddTaskModal;
