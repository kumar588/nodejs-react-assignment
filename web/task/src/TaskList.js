import React from 'react'
import Task from './Task'
import withLogger from './Logger';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        
    }

    handleEditTask(task) {
        this.props.logger.info('in edit task');
        this.setState({ isEdit: true });
        this.setState({ addSubTask: false })
        this.setState({ flag: false })
        this.setState({ taskToEdit: task })
    }
    
    
    render() {
        return (
            <div>
                <ul>
                    {this.props.tasks.filter(task => null !== task).map(task => {
                        return (
                            <div key={task.id}>
                                <Task task={task} updateHomeState={this.props.updateHomeState}/>
                                {task.tasks ? <TaskList tasks={task.tasks} updateHomeState={this.props.updateHomeState}/>: null}
                            </div>
                       );
                    })}
                </ul>
            </div>
        );
    }
}

export default withLogger(TaskList);
