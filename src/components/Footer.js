import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: require('../locales/en/footer'),
  es: require('../locales/es/footer'),
  ja: require('../locales/ja/footer')
});

class Footer extends Component {
  state = {
    date: new Date()
  };

  render() {
    return (
      <div className="Footer">
        <Segment
          inverted
          vertical
          style={{ margin: '5em 0 0', padding: '5em 0' }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    {strings.group} 1
                  </Header>
                  <List link inverted>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.one)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.two)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.three)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.four)}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    {strings.group} 2
                  </Header>
                  <List link inverted>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.one)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.two)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.three)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.four)}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    {strings.group} 3
                  </Header>
                  <List link inverted>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.one)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.two)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.three)}
                    </List.Item>
                    <List.Item as="a">
                      {strings.formatString(strings.link, strings.four)}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header inverted as="h4">
                    {strings.connectWithMe}
                  </Header>
                  <Button
                    circular
                    compact
                    color="facebook"
                    icon="facebook"
                    size="massive"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://facebook.com/hansel.delacruz.14"
                    target="_blank"
                  />
                  <Button
                    circular
                    compact
                    color="linkedin"
                    icon="linkedin"
                    size="massive"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://linkedin.com/in/hansel-de-la-cruz-532199144"
                    target="_blank"
                  />
                  <Button
                    circular
                    compact
                    color="grey"
                    icon="github"
                    size="massive"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://github.com/hanselrd"
                    target="_blank"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Container style={{ marginBottom: '2em' }}>
              <span>
                &copy; Copyright {this.state.date.getFullYear()}{' '}
                <strong>Hansel De La Cruz</strong>
              </span>
            </Container>
            <List horizontal inverted divided link>
              <List.Item as={Link} to="/site-map">
                {strings.siteMap}
              </List.Item>
              <List.Item as={Link} to="/contact-us">
                {strings.contactUs}
              </List.Item>
              <List.Item as={Link} to="/terms">
                {strings.termsAndConditions}
              </List.Item>
              <List.Item as={Link} to="/privacy-policy">
                {strings.privacyPolicy}
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
