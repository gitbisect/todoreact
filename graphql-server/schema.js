export const typeDefs = `
type Query {
  tasks: [Task]
  taskCategories: [TaskCategory]
}

type Mutation {
  toggleTaskStatus( id: ID!, currentStatus: TaskStatusEnum!): ToggleTaskPayload
}

type ToggleTaskPayload {
  task: Task
}

type Task {
 id: ID!
 title: String!
 category: TaskCategory
 taskStatus: TaskStatusEnum
}

enum TaskStatusEnum {
  INCOMPLETE
  COMPLETE
}

type TaskCategory {
  id: ID!
  name: String!
  color: String
}
`;
