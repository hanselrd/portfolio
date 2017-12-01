import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import { Helmet } from 'react-helmet';
import { Card, Image } from 'semantic-ui-react';
import angularLogo from '../../logos/angular-icon.svg';
import reactLogo from '../../logos/facebook_react-icon.svg';
import firebaseLogo from '../../logos/firebase-icon.svg';
import microsoftLogo from '../../logos/microsoft-icon.svg';
import linuxLogo from '../../logos/linux-icon.svg';

const reactImage = <Image floated="right" src={reactLogo} />;
const angularImage = <Image floated="right" src={angularLogo} />;
const firebaseImage = <Image floated="right" src={firebaseLogo} />;
const microsoftImage = <Image floated="right" src={microsoftLogo} />;
const linuxImage = <Image floated="right" src={linuxLogo} />;

class Projects extends Component {
  render() {
    return (
      <div className="Projects">
        <Helmet>
          <title>Projects | Hansel De La Cruz</title>
        </Helmet>
        <h1>Projects</h1>
        <br />
        <Card.Group itemsPerRow={2} stackable>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/portfolio"
            target="_blank"
          >
            <Card.Content>
              {firebaseImage}
              {reactImage}
              <Card.Header>Portfolio</Card.Header>
              <Card.Meta>Under development</Card.Meta>
              <Card.Description>
                This project is the website you are on currently. I've been
                developing this website on my free time to serve as a way for
                employers and others to see my work and get in contact with me.
                At first I had the idea of creating my own blog but I wanted to
                do so much more.
              </Card.Description>
            </Card.Content>
          </Card>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/lotus"
            target="_blank"
          >
            <Card.Content>
              {firebaseImage}
              {angularImage}
              <Card.Header>Lotus</Card.Header>
              <Card.Meta>Under development</Card.Meta>
              <Card.Description>
                This project is also being developed on my free time alongside{' '}
                <em>Portfolio</em>. The goal is to create a web-based
                application using <em>Angular</em> and <em>Firebase</em>'s
                authentication API to allow users to traditionally sign up or
                log in using their social media. I am also using{' '}
                <em>Firebase</em>'s <em>Cloud Firestore</em> to store data
                efficiently without writing a single line of backend code.
              </Card.Description>
            </Card.Content>
          </Card>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/energy-helper"
            target="_blank"
          >
            <Card.Content>
              {firebaseImage}
              {angularImage}
              <Card.Header>Energy Helper</Card.Header>
              <Card.Meta>November 4-5, 2017</Card.Meta>
              <Card.Description>
                This project was developed as an entry for{' '}
                <em>America East Hackathon 2017</em> in under 24 hours by myself
                alongside three other collaborators. We created a simple
                web-based tool that could be used to upload your energy bill or
                manually enter data to provide consumers with effective tips on
                how to save on their energy bills. We used Google Assist to
                provide a personal energy auditor that can safely be activated
                from your computer or mobile device. We won best beginner hack
                as it was our first <em>America East Hackathon</em>.
              </Card.Description>
            </Card.Content>
          </Card>
          <Card
            raised
            as="a"
            href="https://github.com/hanselrd/bubble-warrior-adventures"
            target="_blank"
          >
            <Card.Content>
              {linuxImage}
              {microsoftImage}
              <Card.Header>Bubble Warrior Adventures</Card.Header>
              <Card.Meta>Spring 2017</Card.Meta>
              <Card.Description>
                This project was developed by myself alongside two of my peers.
                I served as team leader and we used agile development to
                organize meetings and plan sprints. We developed a game in{' '}
                <em>C++</em> that dynamically loads in maps using <em>Tiled</em>'s{' '}
                <em>.tmx</em> format and uses <em>Python</em> as its scripting
                language to create a simple API for creating NPCs.
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
