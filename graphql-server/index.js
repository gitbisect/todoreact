import { ApolloServer } from 'apollo-server';
const { ApolloLogExtension } = require('apollo-log');

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const GRAPHQL_PORT = process.env.PORT || 3010;
const REST_PORT = process.env.REST_PORT || 3020;
export const REST_SERVER_URL = `http://localhost:${REST_PORT}`;

const logOptions = {
    timestamp: true,
};
const extensions = [() => new ApolloLogExtension(logOptions)];
const context = {
    restUrl: REST_SERVER_URL,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    // extensions
});

server.listen({
    port: GRAPHQL_PORT,
}).then( ({ url }) => {
    console.log(`graphql server url: ${url}`);
} );
