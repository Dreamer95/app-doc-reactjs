// Libraries
import React, {Component, Fragment} from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    Label, Input
} from 'reactstrap';

// Assets
import './styles.less';

class NewDocumentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document : '',
            title: ''
        };
    }

    toggleModal = () => {
        this.setState({
            document : '',
            title: ''
        });
        this.handleCallback({
            isOpen: false
        });
    };

    handleCallback = (callback) => {
        this.props.callback(callback);
    };

    onChangeDocument = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    };

    onClickSaveModal = (parentTitle) => {
        this.props.sendNewDocument({...this.state,parentTitle});
        this.toggleModal();
    }

    renderFormGroup(parentTitle) {
        let {document, title} = this.state;
        
        const html = (
            <Fragment>
                <Label  for="newDocument" className="none mt-3">Document</Label> <br />
                <Input  type="text" name="document"
                    id="newDocument" placeholder="new document" value={document} onChange= {this.onChangeDocument}
                />
            </Fragment>
        );

        return (
            <div className="form-group">
                <Label for="newTitle">Title</Label> <br />
                <Input type="text" placeholder="new title" name="title"
                    id="newTitle" value={parentTitle ? parentTitle : title} onChange= {this.onChangeDocument} readOnly={parentTitle ? true : false}
                />
                {parentTitle ? html : ''}
            </div>
        );
    }

    render() {
        const {isOpen, parentTitle} = this.props;

        return (
            <Modal isOpen={isOpen} className="modal-lg" toggle={this.toggleModal}>
                <ModalBody>
                    {this.renderFormGroup(parentTitle)}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.onClickSaveModal(parentTitle)}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default NewDocumentModal;
