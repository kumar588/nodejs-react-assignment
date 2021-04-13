import React from 'react';

class SubTasks extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            task: props.task
        }
    }

    render() {
        console.log(`in subtasks ${this.state.task}`)
        return (
        
            <div>
                <p>SubTasks</p> 
            </div>
        );
    }
}
