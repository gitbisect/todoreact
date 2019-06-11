import React, { Fragment } from 'react'
import { Row, Col, Button, Icon, Tag } from 'antd';
import gql from 'graphql-tag'

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


class TaskItem extends React.Component {
    render() {

		const { task: { id, title, category, taskStatus } } = this.props;
		const titleStyle = 'INCOMPLETE' === taskStatus ? 'none' : 'line-through'
        return(
            <Fragment>
                <Col xs={12} md={12}>
                    <h3 style={{ textDecoration: titleStyle }}>{title}</h3>
                    <Tag color={category.color}>{category.name}</Tag>
                </Col>
                <Col xs={12} md={12}>
                    <Row type="flex" justify="end">
						{   'INCOMPLETE'  === taskStatus ? 
							<Button onClick={ () => {
								alert(`Mark complete ${id}`)
							}}
											type="primary"
											style={{marginRight: '5px'}}
										>Mark Complete</Button> :
										<Button  onClick={ () => {
											alert(`Mark incomplete ${id}`)
										}}
										type="alert"
										style={{marginRight: '5px'}}
									>Mark Incomplete</Button>
						}            <Button  onClick={ () => {
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
