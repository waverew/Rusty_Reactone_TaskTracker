import TaskChip from "./task-chip/TaskChip";
import "./TaskTable.css";
const TaskTable = (props) => {
    return (
        <div className="TaskTable">
            <div className="task-table-inner">

            </div>
            <div className="task-table-inner">
                {props.data.map(data => <TaskChip data={data}/>)}
            </div>
        </div>
    )
}
export default TaskTable;