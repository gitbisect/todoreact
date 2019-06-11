import React from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { List } from 'antd'
import TaskItem, { TaskItemFragment } from "../TaskItem";

export const TASKS_QUERY = gql`
query TASKS_QUERY {
  tasks {
    id
    ...TaskItem
  }
}
${TaskItemFragment}
`;

const TaskList = () => (
  <Query
   query={TASKS_QUERY}
  >
      {({ loading, error, data }) => {

          if ( error ) {
              console.log( `Error ${error.message}` );
          }

          return (
              <List
                loading={loading}
                style={ { background: `white` } }
                bordered
                dataSource={data.tasks}
                renderItem={task => (
                  <List.Item key={task.id}>
                    <TaskItem
                        task={task}
                    />
                  </List.Item>
                )}
              />
          );
      }}

  </Query>
)

export default TaskList
