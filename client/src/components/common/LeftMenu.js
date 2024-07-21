import "./LeftMenu.css";
import { v4 as uuidv4 } from "uuid";
const LeftMenu = (props) => {
  console.log(uuidv4());

  const addTask = () => {
    props.onAddTask({
      title: "Hellow nogga",
      content: "Lorem ipsum lorem upsum",
      importance: 1,
      status: 2,
    });
  };
  return (
    <div className="LeftMenu">
      <button onClick={addTask}>добавить таску</button>
    </div>
  );
};
export default LeftMenu;
