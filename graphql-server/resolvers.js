// import { PubSub } from "graphql-subscriptions"
// import { CategoryModel, TasksModel } from "./models"

// const pubsub = new PubSub()
// const TASK_CREATED = "taskCreated"
// const TASK_DELETED = "taskDeleted"
// const TASK_UPDATED = "taskUpdated"

import { TasksModel, CategoryModel } from './models'

export const resolvers = {
    Query:  {
        tasks: async () => {
            const filters = {};
            const res = await TasksModel.getTasks(filters);
            return res.tasks;
        },
        taskCategories: async () => {
            return await CategoryModel.getCategories();
        }
    },
    Mutation: {
        toggleTaskStatus: (_, {id, currentStatus }, context, info ) => {
            const newStatus = currentStatus === 'INCOMPLETE' ? 'COMPLETE' : 'INCOMPLETE';
            const task = TasksModel.updateTask(id, {status: newStatus})
            return {task}
        },
        createTask: async (_, { title, categoryId } ) => {
            const task = await TasksModel.createTask({
                title,
                category: categoryId
            });
            return {task}
        }
    },
    Task: {
        taskStatus: (task, args, context, info) => {
            return task.status;
        },
        category: async (task, args, context, info) => {
            return await CategoryModel.getCategoryById(task.category)
        }
    }
};
