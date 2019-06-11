import React from 'react'
import { Select, Tag } from 'antd'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

const Option = Select.Option;

const allCategoriesQuery = gql`
query allCategories {
  taskCategories{
    name
    id
    color
  }
}
`;

const TaskCategorySelect = (props) => {

  const { handleChange } = props;

  return (
    <Query
      query={allCategoriesQuery}
    >
      {({ loading, error, data }) => {

        if (error) {
          console.log(`Error ${error.message}`);
        }

        return (
        <Select
          allowClear
          disabled={loading}
          showSearch
          style={{ width: 200 }}
          placeholder="Select category"
          onChange={value => { handleChange(value) }}
        >
          {data.taskCategories && data.taskCategories.map(({ id, name, color }) => (
            <Option key={id} value={id}>
              <Tag color={color}>{name}</Tag>
            </Option>
          )
          )
          }
        </Select>)
      }}
    </Query>
  )
}

export default TaskCategorySelect