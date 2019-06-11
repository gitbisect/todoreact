import React from "react"
import { Button, Input } from 'antd'
import TaskCategorySelect from '../TaskCategorySelect'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TASKS_QUERY } from '../TaskList'

const createTaskMutation = gql`
mutation create_task ($title: String!, $categoryId:ID!) {
  createTask(title:$title, categoryId: $categoryId ){
    task{
      id
      title
    }
  }
}
`;

class NewTaskForm extends React.Component {
  state = {
    title: '',
    category: ''
  };

  render() {

    return (
      <Mutation
        mutation={createTaskMutation}
      >
        {createTask => (
          <form onSubmit={(e) => {
            e.preventDefault();
            createTask({
              variables:{
                title: this.state.title,
                categoryId: this.state.category
              },
              refetchQueries:[ { query: TASKS_QUERY }]
            })
          }}>
            <h2>New Task</h2>
            <Input
              style={{ width: '70%' }}
              onChange={e => { this.setState({ title: e.target.value }) }}
              value={this.state.title}
              placeholder='Something' />
            <TaskCategorySelect handleChange={
              (value) => {
                this.setState({
                  category: value
                })
              }
            } />
            <Button htmlType='submit' type="primary">
              Create Task
      </Button>
          </form>)}

      </Mutation>
    )
  }
};

export default NewTaskForm;
