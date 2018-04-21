import * as express from 'express';
import { GraphQLServer, Options } from 'graphql-yoga';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql';

const options: Options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/playground'
};

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  const server = new GraphQLServer({ schema });

  server.express.use(
    express.static(path.join(__dirname, '../../client/build'))
  );

  server.express.get('*', (req, res, next) => {
    if (!server.options.playground || req.url !== server.options.playground) {
      return res.sendFile(
        path.join(__dirname, '../../client/build/index.html')
      );
    }
    return next();
  });

  server.start(options, ({ port }) => {
    console.log(`Server is running on port ${port}`);
  });
};

bootstrap();
