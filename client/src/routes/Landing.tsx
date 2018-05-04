import * as React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

const Landing: React.SFC = () => (
  <div>
    <Helmet>
      <title>Landing - Hansel De La Cruz</title>
    </Helmet>
    <Segment inverted={true}>
      <Container text={true}>
        <Header as="h1" content="Imagine-a-company" inverted={true} />
        bacon
      </Container>
    </Segment>
  </div>
);

export default Landing;
