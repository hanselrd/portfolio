import * as express from 'express';
import { GraphQLServer, Options } from 'graphql-yoga';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import firebase from './core/firebase';
import { authChecker, UserResolver } from './graphql';

const options: Options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/playground'
};

const bootstrap = async () => {
  const schema = await buildSchema({
    authChecker,
    resolvers: [UserResolver]
  });

  const server = new GraphQLServer({
    schema,
    context: async req => {
      let token = '';
      if (req.request) {
        token = req.request.headers['authorization'] as string;
      } else if (req.connection) {
        token = req.connection.context['authorization'];
      }
      if (token) {
        return firebase
          .auth()
          .verifyIdToken(token)
          .then(({ sub }) => {
            return firebase
              .auth()
              .getUser(sub)
              .then(user => ({
                ...req,
                user
              }))
              .catch(error => ({
                ...req
              }));
          })
          .catch(error => ({
            ...req
          }));
      }
      return { ...req };
    }
  });

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
