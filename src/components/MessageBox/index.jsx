import React, {Component, Fragment} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import PropTypes from 'prop-types';

//import Less
import './styles.less';

//Components
import Loading from 'Components/Loading';

const propTypes = {
    id: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    btnConfirmName: PropTypes.string,
    btnCloseName: PropTypes.string,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func.isRequired
};

const defaultProps = {
    id: '',
    width: 466,
    height: 100,
    top: 30,
    icon: 'icon-success-green', //icon-success-green, icon-warning, icon-error-red
    isOpen: false,
    title: '',
    message: '',
    isConfirm: false,
    btnConfirmName: 'OK',
    btnCloseName: 'Cancel',
    isLoading: false
};

class MessageBox extends Component {
    onClose() {
        this.props.onClose({
            isOpen: false
        });
    }

    onConfirm() {
        this.props.onConfirm({
            isOpen: false,
            id: this.props.id
        });
    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.onClose.bind(this)} style={{width: this.props.width, top: this.props.top + '%'}} className={'pl-60'}>
                {
                    this.props.isLoading ?
                        <Loading top={'60%'} /> :
                        <Fragment>
                            <ModalHeader className={'pb-10'} tag={'h5'}>
                                <i className={this.props.icon} /><strong>{this.props.title}</strong>
                                <button type="button" className="close"><i className="icon-close-square" onClick={this.onClose.bind(this)} /></button>
                            </ModalHeader>
                            <ModalBody className={'pt-0 pb-0'}>
                                <p className="mb-0">{this.props.message}</p>
                            </ModalBody>
                            <ModalFooter className={'d-block'}>
                                <hr className="mt-0 mr-0" />
                                {
                                    (typeof this.props.onConfirm !== 'undefined' && this.props.icon === 'icon-warning' && this.props.btnConfirmName) &&
                                <button type="button" className="btn btn-green ml-0 mr-10" onClick={this.onConfirm.bind(this)}>{this.props.btnConfirmName}</button>
                                }
                                <button type="button" className="btn btn-grey ml-0" onClick={this.onClose.bind(this)}>{this.props.btnCloseName}</button>
                            </ModalFooter>
                        </Fragment>
                }
            </Modal>
        );
    }
}

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;

export default MessageBox;
