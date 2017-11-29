import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Card, Image } from 'semantic-ui-react';

const reactImage = (
  <Image
    src="https://www.vectorlogo.zone/logos/facebook_react/facebook_react-ar21.svg"
    style={{ backgroundColor: 'black' }}
  />
);

const angularImage = (
  <Image
    src="https://www.vectorlogo.zone/logos/angular/angular-ar21.svg"
    style={{ backgroundColor: '#1976d2' }}
  />
);

const microsoftImage = (
  <Image src="https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" />
);

class Projects extends Component {
  render() {
    return (
      <div className="Projects">
        <Helmet>
          <title>Projects | Hansel De La Cruz</title>
        </Helmet>
        <Card.Group itemsPerRow={2}>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/portfolio"
            target="_blank"
          >
            {reactImage}
            <Card.Content>
              <Card.Header>Portfolio</Card.Header>
              <Card.Meta>React</Card.Meta>
              <Card.Description>Portfolio app</Card.Description>
            </Card.Content>
          </Card>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/lotus"
            target="_blank"
          >
            {angularImage}
            <Card.Content>
              <Card.Header>Lotus</Card.Header>
              <Card.Meta>Angular 2+</Card.Meta>
              <Card.Description>Lotus app</Card.Description>
            </Card.Content>
          </Card>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/energy-helper"
            target="_blank"
          >
            {angularImage}
            <Card.Content>
              <Card.Header>Energy Helper</Card.Header>
              <Card.Meta>Angular 2+</Card.Meta>
              <Card.Description>Energy Helper app</Card.Description>
            </Card.Content>
          </Card>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/bubble-warrior-adventures"
            target="_blank"
          >
            {microsoftImage}
            <Card.Content>
              <Card.Header>Bubble Warrior Adventures</Card.Header>
              <Card.Meta>C++</Card.Meta>
              <Card.Description>Game using SFML</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default Projects;
