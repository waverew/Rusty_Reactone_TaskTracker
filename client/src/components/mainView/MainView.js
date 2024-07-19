import TaskTable from "../task/TaskTable";
import "./MainView.css";
const MainView = (props) => {
    return (
        <div className="MainView">
            <TaskTable data={props.data}/>
        </div>
    );
} 
export default MainView;