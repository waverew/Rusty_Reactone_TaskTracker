import "./LeftMenu.css";
import { v4 as uuidv4 } from "uuid";
const LeftMenu = (props) => {
  console.log(uuidv4());

  const addTask = () => {
    props.handleDialogState(0);
  };
  return (
    <div className="LeftMenu">
      <button onClick={addTask} className="button-standard">добавить таску</button>
    </div>
  );
};
export default LeftMenu;
