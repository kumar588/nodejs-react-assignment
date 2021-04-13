import React from 'react'
class TasksView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTasks: props.tasks
        }
    }
    render() {
        console.log(`in task view ${this.state.allTasks}`)
        return (
            <div>
                <ul>
                    {this.state.allTasks.map(task => {
                        console.log('in ul')
                        return (<li>
                            {task.title}
                            {task.tasks && <TasksView tasks={task.tasks} />}
                        </li>);
                    })}
                </ul>
            </div>
        );
    }
}

export default TasksView;