import './TaskChip.css';
const TaskChip = (props) => {

    const getImportance = () => {
        const importanceStyle = document.getElementsByClassName("task-importance");
        switch (props.data.importance) {
            case 0: {
                return "низкая";
            }
            case 1: {
                return "средняя";
            }
            case 2: {
                return "высокая";
            }
            default: return "обычная";
        }
    }

    const styleColor = () => {
        if (props.data.importance === 0) {
            return "green";
        }
        if (props.data.importance === 1) {
            return "orange";
        }
        if (props.data.importance === 2) {
            return "red";
        }
    }

    return (
        <div className="TaskChip" onDragStart={props.onDragStart} onDragEnd={props.onDragEnd} draggable>
            <div className="delete-chip" onClick={() => props.deleteChip(props.data)}>x</div>
            <div className="task-importance" title={getImportance()} style={{ color: styleColor() }}>•</div>
            <div className="d-flex task-title">
                <div className="task-title-wrapper">
                    <div className="task-title-text">
                        {props.data.title}
                    </div>
                </div>
            </div>
            <div className="d-flex task-content">
                {props.data.content}
            </div>
            {/* <div className="d-flex task-importance" style={{ color: styleColor() }}>
                {}
            </div> */}
        </div>
    )
}
export default TaskChip;
