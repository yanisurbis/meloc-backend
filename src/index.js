const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    info: () => "Hello HERE!",
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
  },
  Link: {
    id: root => root.id,
    description: root => root.description,
    url: root => root.url,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
