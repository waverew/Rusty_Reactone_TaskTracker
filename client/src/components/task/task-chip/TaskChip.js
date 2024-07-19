import './TaskChip.css';
const TaskChip = (props) => {
    const getImportance = () => {
        switch (props.data.importance) {
            case 0: return "низкая";
            case 1: return "средняя";
            case 2: return "высокая";
            default: return "обычная";
        }
    }
    return (
        <div className="TaskChip">
            <div className="d-flex task-title">
                {props.data.title}
            </div>
            <div className="d-flex task-content">
                {props.data.content}
            </div>
            <div className="d-flex task-importance">
                {getImportance()}
            </div>
        </div>
    )
}
export default TaskChip;