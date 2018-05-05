import strings from '@app/core/strings';
import * as React from 'react';
import { Card, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { RootState } from '@app/ducks';
import { localeActions } from '@app/ducks/locale';

type LanguageModalProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class LanguageModal extends React.Component<LanguageModalProps> {
  public handleLanguageClick(language: string) {
    this.props.localeChange(language);
    this.props.localeHideModal();
  }

  public render() {
    return (
      <Modal
        trigger={this.props.children}
        basic={true}
        open={this.props.showModal}
        onClose={() => this.props.localeHideModal()}
      >
        <Modal.Header>{strings.chooseYourPreferredLanguage}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Card.Group itemsPerRow={2}>
              <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('en')}
              >
                <Card.Content>
                  <Card.Header>English</Card.Header>
                </Card.Content>
              </Card>
              <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('es')}
              >
                <Card.Content>
                  <Card.Header>Español</Card.Header>
                </Card.Content>
              </Card>
              {/* <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('pt')}
              >
                <Card.Content>
                  <Card.Header>Português</Card.Header>
                </Card.Content>
              </Card>
              <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('fr')}
              >
                <Card.Content>
                  <Card.Header>Français</Card.Header>
                </Card.Content>
              </Card>
              <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('ru')}
              >
                <Card.Content>
                  <Card.Header>русский</Card.Header>
                </Card.Content>
              </Card>
              <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('ja')}
              >
                <Card.Content>
                  <Card.Header>日本語</Card.Header>
                </Card.Content>
              </Card>
              <Card
                as="a"
                raised={true}
                onClick={() => this.handleLanguageClick('zh')}
              >
                <Card.Content>
                  <Card.Header>中文</Card.Header>
                </Card.Content>
              </Card> */}
            </Card.Group>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => state.locale;

const mapDispatchToProps = {
  localeChange: localeActions.change,
  localeHideModal: localeActions.hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageModal);
