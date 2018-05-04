import * as React from 'react';
import { Modal, Container } from 'semantic-ui-react';
const SetLanguageModal: React.SFC = ({ children }) => (
  <Modal trigger={children}>
    <Modal.Header>Set Language</Modal.Header>
    <Modal.Content>
      <p>
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2
      </p>
      <Modal.Description>
        <Container text={true}>whats good?</Container>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default SetLanguageModal;
