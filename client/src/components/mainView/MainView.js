import TaskTable from "../task/TaskTable";
import LeftMenu from "../common/LeftMenu";
import "./MainView.css";
import { useState } from "react";
const MainView = (props) => {
    const [data, setData] = useState([
        {
          title: "Hellow",
          content: "Lorem ipsum lorem upsum",
          importance: 1,
          status: 0,
        },
        {
          title: "Hellow nogga",
          content: "Lorem ipsum lorem upsum",
          importance: 1,
          status: 2,
        },
      ]);
    const addTask = (task) => {
        setData([...data, task]);
    }
    return (
        <div className="MainView">
            <LeftMenu onAddTask={addTask}></LeftMenu>
            <TaskTable data={data}/>
        </div>
    );
} 
export default MainView;