import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import produce from 'immer';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import MessageBox from 'Components/MessageBox';

// Actions
import {updateDocs, getLeftMenu} from 'Modules/Docs/actions';
import {showLoading, hideLoading} from 'Modules/Layouts/actions';

// Components
import SwitchButton from 'Components/SwitchButton';
import TextComponent from 'Modules/Docs/components/Text';
import TypeComponent from 'Modules/Docs/components/Component';
import APIComponent from 'Modules/Docs/components/API';

// Services
import * as DocumentService from 'Src/services/Document';

// Assets
import './styles.less';
import {getLinkFromState, getMatchFromPath} from 'Src/utils';

const defaultProps = {
    settings: {
        types: [
            {key: 'text', label: 'Text'},
            {key: 'component', label: 'Component'},
            {key: 'api', label: 'API'}
        ]
    }
};

class Edit extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: '',
            messageBox: {
                isOpen: false,
                icon: 'icon-success-green',
                title: 'Success',
                message: 'Success',
                id: ''
            },
            type: {},
            isTitleValid: true,
            title: '',
            content: ''
        };
    }

    componentDidMount() {
        const {documents, updateDocs, showLoading, hideLoading} = this.props;
        const {types} = defaultProps.settings;
        const pathInfo = getMatchFromPath(this.props.history.location.pathname);
        const {params} = pathInfo;
        const {docId} = params;
        const document = documents[docId];
        let newState = {
            id: docId,
            type: types[0]
        };

        if (document) {
            newState.title = document.title;
            newState.content = document.content;
        } else {
            const getDocument = DocumentService.get({
                id: docId,
                type: 'document'
            });

            if (getDocument) {
                showLoading();

                getDocument.then((response) => {
                    if (response) {
                        hideLoading();

                        if (response.data && response.data.data && response.data.data.result) {
                            const {result} = response.data.data;
                            const {document_title, content} = result;

                            if (document_title && content) {
                                updateDocs({
                                    documents: produce(documents, (draftDocs) => {
                                        draftDocs[docId] = {
                                            title: document_title,
                                            content
                                        };
                                    })
                                });

                                this.setState({
                                    title: document_title,
                                    content
                                });
                            }
                        }
                    }
                });
            }
        }

        this.setState(newState);
    }

    onChangeTitle = (event) => {
        this.setState({
            isTitleValid: true,
            title: event.target.value
        });
    };

    onClickSelectType = (type) => {
        if (type) {
            this.setState({type});
        }
    };

    renderType = () => {
        const {type, content} = this.state;
        const {key} = type;
        const handleCallbackTextComponent = (callback) => {
            if (callback) {
                const {content} = callback;
                let newState = {};

                if (content) {
                    newState.content = content;
                }

                if (Object.keys(newState)) {
                    this.setState(newState);
                }
            }
        };

        switch (key) {
            case 'text':
                return (<TextComponent content={content} callback={handleCallbackTextComponent} />);
            case 'component':
                return (<TypeComponent />);
            case 'api':
                return (<APIComponent />);
        }
    };

    onClickSave = () => {
        this.saveDocument(() => {
            //
        });
    };

    onClickSaveAndPreview = () => {
        this.saveDocument(() => {
            const {id} = this.state;
            const link = getLinkFromState('documents.view', {
                docId: id
            });

            if (link) {
                this.props.history.push(link);
            }
        });
    };

    saveDocument = (callback) => {
        const {documents, showLoading, hideLoading, updateDocs, getLeftMenu} = this.props;
        const {title, content} = this.state;
        const {id} = this.state;
        const isTitleValid = this.state.title.trim().length;

        if (isTitleValid) {
            if(title && content){
                let documentService = DocumentService.update({
                    id,
                    type: 'document',
                    document_title: title,
                    description: '',
                    content
                });

                if(documentService){
                    showLoading();

                    documentService.then((response) => {
                        if (response) {
                            hideLoading();

                            if (response.data && response.data.data && response.data.data.status === 1) {
                                getLeftMenu();
                                updateDocs({
                                    documents: produce(documents, (draftDocs) => {
                                        draftDocs[id] = {
                                            title,
                                            content
                                        };
                                    })
                                });

                                callback(response);
                            } else if (response.data.data.message) {
                                this.setState({
                                    messageBox: {
                                        ...this.state.messageBox,
                                        isOpen: true,
                                        icon: 'icon-warning',
                                        title: 'Warning',
                                        message: response.data.data.message
                                    }
                                });
                            }
                        }
                    });
                }
            }
        } else {
            this.setState({
                isTitleValid
            });
        }
    };

    onClickCancel = () => {
        const {id} = this.state;
        const link = getLinkFromState('documents.view', {
            docId: id
        });

        if (link) {
            this.props.history.push(link);
        }
    };

    closeMessageBox = () => {
        this.setState({
            messageBox: {
                ...this.state.messageBox,
                isOpen: false
            }
        });
    };

    render() {
        const {messageBox, title, isTitleValid, type} = this.state;
        const {types} = defaultProps.settings;

        return (
            <Fragment>
                <div style={{padding: 20}}>
                    <div className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-md-1 col-form-label">Title</label>
                            <div className="col-md-11">
                                <input
                                    type="text"
                                    className={`form-control ${isTitleValid ? '' : 'is-invalid'}`}
                                    alt=""
                                    placeholder="Title document"
                                    value={title}
                                    onChange = {this.onChangeTitle}
                                />
                                <div className="invalid-feedback">Please provide a valid informations.</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-1 col-form-label">Status</label>
                            <div className="col-md-11" style={{paddingTop: 5}}>
                                <SwitchButton id="document-status" checked={false} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-1 col-form-label">Type</label>
                            <div className="col-md-11">
                                <UncontrolledDropdown>
                                    <DropdownToggle color={'primary'} caret>
                                        {type.label}
                                    </DropdownToggle>
                                    <DropdownMenu style={{minWidth: 250}}>
                                        {
                                            types.map((type) => {
                                                const {key, label} = type;

                                                if (key && label) {
                                                    return (
                                                        <DropdownItem key={key} onClick={() => {this.onClickSelectType(type)}}>{label}</DropdownItem>
                                                    );
                                                }
                                            })
                                        }
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </div>
                        {this.renderType()}
                        <div className="form-group row">
                            <label className="col-md-1 col-form-label" />
                            <div className="col-md-11">
                                <button type="button" onClick={this.onClickSaveAndPreview} className="btn btn-sm btn-primary">
                                    Save and preview
                                </button>
                                <button type="button" onClick={this.onClickSave} className="btn btn-sm btn-primary" style={{marginLeft: 5}}>
                                    Save changes
                                </button>
                                <button type="button" onClick={this.onClickCancel} className="btn btn-sm btn-secondary" style={{marginLeft: 5}}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    messageBox.isOpen ? (
                        <MessageBox onClose={this.closeMessageBox} {...this.state.messageBox} />
                    ) : null
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        documents: state.Docs.documents
    };
};

const mapDispatchToProps = {
    updateDocs,
    getLeftMenu,
    showLoading,
    hideLoading
};

Edit = connect(mapStateToProps, mapDispatchToProps)(Edit);
Edit = withRouter(Edit);

export default Edit;
