import strings from '@app/core/strings';
import { RootState } from '@app/ducks';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonProps,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment
} from 'semantic-ui-react';
import styled, { StyledComponentClass } from 'styled-components';

const FooterSocialLinkButton = styled(Button).attrs({
  circular: true,
  compact: true,
  size: 'massive',
  as: 'a',
  target: '_blank'
})`
  &&& {
    margin: 0 0.3em;
  }
` as StyledComponentClass<ButtonProps, {}>;

type FooterProps = ReturnType<typeof mapStateToProps>;

const Footer: React.SFC<FooterProps> = ({ auth, users }) => (
  <Segment
    inverted={true}
    vertical={true}
    style={{ margin: '5em 0 0', padding: '5em 0' }}
  >
    <Container textAlign="center">
      <Grid divided={true} inverted={true} stackable={true}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted={true} as="h4">
              {strings.group} 1
            </Header>
            <List link={true} inverted={true}>
              <List.Item as="a">{strings.link} 1</List.Item>
              <List.Item as="a">{strings.link} 2</List.Item>
              <List.Item as="a">{strings.link} 3</List.Item>
              <List.Item as="a">{strings.link} 4</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted={true} as="h4">
              {strings.group} 2
            </Header>
            <List link={true} inverted={true}>
              <List.Item as="a">{strings.link} 1</List.Item>
              <List.Item as="a">{strings.link} 2</List.Item>
              <List.Item as="a">{strings.link} 3</List.Item>
              <List.Item as="a">{strings.link} 4</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted={true} as="h4">
              {strings.group} 3
            </Header>
            <List link={true} inverted={true}>
              <List.Item as="a">{strings.link} 1</List.Item>
              <List.Item as="a">{strings.link} 2</List.Item>
              <List.Item as="a">{strings.link} 3</List.Item>
              <List.Item as="a">{strings.link} 4</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted={true} as="h4">
              {strings.connectWithMe}
            </Header>
            <FooterSocialLinkButton
              color="facebook"
              icon="facebook"
              href="https://facebook.com/hansel.delacruz.14"
            />
            <FooterSocialLinkButton
              color="linkedin"
              icon="linkedin"
              href="https://linkedin.com/in/hansel-de-la-cruz-532199144"
            />
            <FooterSocialLinkButton
              color="grey"
              icon="github"
              href="https://github.com/hanselrd"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider inverted={true} section={true} />
      <Container style={{ marginBottom: '2em' }}>
        &copy; Copyright {new Date().getFullYear()}{' '}
        <strong>Hansel De La Cruz</strong>
      </Container>
      <List horizontal={true} inverted={true} divided={true} link={true}>
        <List.Item as={Link} to="/sitemap">
          {strings.sitemap}
        </List.Item>
        <List.Item as={Link} to="/contact-us">
          {strings.contactUs}
        </List.Item>
        <List.Item as={Link} to="/terms">
          {strings.termsAndConditions}
        </List.Item>
        <List.Item as={Link} to="/privacy">
          {strings.privacyPolicy}
        </List.Item>
      </List>
      {auth.user &&
        users[auth.user.uid] && (
          <Container style={{ marginTop: '2em' }}>
            <span style={{ color: 'grey' }}>
              {users[auth.user.uid].displayName}
            </span>
          </Container>
        )}
    </Container>
  </Segment>
);

const mapStateToProps = (state: RootState) => state;

export default connect(mapStateToProps, {})(Footer);
