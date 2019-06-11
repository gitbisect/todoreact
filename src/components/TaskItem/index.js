import React, { Fragment } from 'react'
import { Row, Col, Button, Icon, Tag } from 'antd';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const TaskItemFragment = gql`
fragment TaskItem on Task {
  id
  title
  taskStatus
  category {
    id
    name
    color
  }
}
`;

const toggleTaskStatusMutation = gql`
mutation ToggleTaskStatus ($id: ID!, $taskStatus: TaskStatusEnum!){
    toggleTaskStatus(id: $id, currentStatus: $taskStatus ){
      task {
        id
        taskStatus
      }
    }
  }
`;


class TaskItem extends React.Component {
  render() {

    const { task: { id, title, category, taskStatus } } = this.props;
    const titleStyle = 'INCOMPLETE' === taskStatus ? 'none' : 'line-through'
    const toggleButtonText = 'INCOMPLETE' === taskStatus ? 'Mark complete' : 'Mark incomplete'
    const toggleButtonType = 'INCOMPLETE' === taskStatus ? 'primary' : 'danger'
    return (
      <Fragment>
        <Col xs={12} md={12}>
          <h3 style={{ textDecoration: titleStyle }}>{title}</h3>
          <Tag color={category.color}>{category.name}</Tag>
        </Col>
        <Col xs={12} md={12}>
          <Row type="flex" justify="end">
            <Mutation
              mutation={toggleTaskStatusMutation}
            >
              {
                (toggleTaskStatus) => (
                  <Button
                    onClick={() => toggleTaskStatus({
                      variables: {
                        id,
                        taskStatus
                      }})}
                    type={toggleButtonType}
                    style={{ marginRight: '5px' }}
                  >{toggleButtonText}
                  </Button>
    )
              }
              
            
            </Mutation>
            <Button onClick={() => {
              alert(`delete the task ${id}`)
            }}
              type="danger"
            >
              <Icon type="delete" /> Delete
                        </Button>
          </Row>
        </Col>
      </Fragment>
    );
  }
}

export default TaskItem
