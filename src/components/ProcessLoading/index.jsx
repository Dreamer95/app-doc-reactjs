import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {connect} from 'react-redux';

import './styles.less';

class ProcessLoading extends Component {
    render() {
        return (
            <Modal isOpen={this.props.processLoading} className={this.props.className} style={{top: 200, width: 378}}>
                <ModalHeader>
                    <div className="modal-title"><strong>Processing</strong></div>
                </ModalHeader>
                <ModalBody className={'pt-0'}>
                    <div className="pb-5">Please waiting...</div>
                </ModalBody>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        processLoading: state.Report.processLoadingReducer.processLoading
    };
}

export default connect(mapStateToProps)(ProcessLoading);
