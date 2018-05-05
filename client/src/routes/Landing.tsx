import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Segment } from 'semantic-ui-react';

const Landing: React.SFC = () => (
  <Segment>
    <Helmet>
      <title>Landing - Hansel De La Cruz</title>
    </Helmet>
    <Container text={true}>Landing</Container>
  </Segment>
);

export default Landing;
