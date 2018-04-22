// import firebase from '@app/core/firebase';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let httpLink: HttpLink;

export let subscriptionClient: SubscriptionClient;

const subscriptionClientOptions = {
  connectionParams: () => ({
    authorization: localStorage.getItem(process.env
      .REACT_APP_AUTH_KEY as string)
  }),
  reconnect: true
};

if (process.env.NODE_ENV !== 'production') {
  httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  subscriptionClient = new SubscriptionClient(
    'ws://localhost:4000/graphql',
    subscriptionClientOptions
  );
} else {
  httpLink = new HttpLink({
    uri: 'https://<12345>.herokuapp.com/graphql'
  });

  subscriptionClient = new SubscriptionClient(
    'wss://<12345>.herokuapp.com/graphql',
    subscriptionClientOptions
  );
}

const wsLink = new WebSocketLink(subscriptionClient);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query as any
    ) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem(process.env
      .REACT_APP_AUTH_KEY as string)
  }
}));

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});
