import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// Actions
import {hideLoading, showLoading} from 'Modules/Layouts/actions';
import {getLeftMenu} from 'Modules/Docs/actions';

// Services
import * as DocumentService from 'Src/services/Document';

// Assets
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getLinkFromState} from 'Src/utils';

//Components
import NewDocumentModal from 'Components/NewDocumentModal';

const listSubject = [
    {
        id: 1,
        name: 'Getting started'
    },
    {
        id: 2,
        name: 'Become a developer'
    },
    {
        id: 3,
        name: 'Register an application'
    }
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zIndex: 1003,
            activeDocId: '',
            isOpenNewDocumentModal: false,
            isOpenNewSubjectModal: false,
            isToggleStartGuide: true,
            titleStartGuide: 'Quick Start Guide',
            parentTitle: ''
        };
    }

    componentDidMount() {
        const {getLeftMenu} = this.props;

        getLeftMenu();
    }

    onClickLink = (docId) => {
        this.setState({
            activeDocId: docId
        });
    };

    onClickNewDoc = (payload) => {
        const {id} = payload;

        this.setState({
            isOpenNewDocumentModal: true,
            parentTitle: ''
        });
    };

    callbackNewDocumentModal = (callback) => {
        if (callback) {
            let newState = {};

            //

            if (typeof callback.isOpen === 'boolean') {
                newState.isOpenNewDocumentModal = callback.isOpen;
            }

            if (Object.keys(newState).length) {
                this.setState(newState);
            }
        }
    };

    renderDocument = (documents,parentTitle) => {
        let keyTemp = documents.length;

        let result = documents.map((document, index) => {
            return <li key={index}><a href="">{document.name}</a></li>;
        });

        result.push(<li key={keyTemp} onClick={()=>this.onClickNewDocument(parentTitle)}><a><FontAwesomeIcon icon="plus-circle" /> New a document</a></li>);
        return result;
    };

    onClickNewDocument = (parentTitle) => {
        this.setState({
            isOpenNewDocumentModal: true,
            parentTitle
        });
    }

    onGetDocumentData = (payload) => {

        if (payload && payload.document) {
            const newID = listSubject.length++;
            const newDoc = {
                id: newID,
                name: payload.document
            };

            listSubject.push(newDoc);
        }
        if (payload && payload.title) {

            //callAPI
            let documentService = DocumentService.create({
                type: 'document',
                parent_id: '',
                document_title: payload.title,
                description: '',
                content: ''
            });

            if (documentService) {
                documentService.then((response) => {

                    if (response && response.data.data && response.data.data.status ) {
                        const {getLeftMenu} = this.props;

                        getLeftMenu();
                    }
                });
            }

        }

    };

    toggleStartGuide = () => {
        this.setState({
            isToggleStartGuide: !this.state.isToggleStartGuide
        });
    };

    render() {
        const {routeInfo, leftMenu} = this.props;
        const {activeDocId, isOpenNewDocumentModal, isToggleStartGuide, titleStartGuide, parentTitle} = this.state;

        return (
            <Fragment>
                <aside className="sidebar">
                    <div className="scrollbar">
                        <div className="top-left-nav">
                            <h5 className="title">ANTS Open Platform</h5>
                        </div>
                        <ul className="left-nav">
                            {
                                leftMenu.length ? (
                                    leftMenu.map((document) => {
                                        const {id, title} = document;
                                        const isActive = activeDocId === id;
                                        const link = getLinkFromState('documents.view', {
                                            docId: id
                                        });

                                        if (id && title) {
                                            return (
                                                <li
                                                    key={id}
                                                    className={`${isActive ? 'active' : ''}`}
                                                    onClick={() => {this.onClickLink(id)}}
                                                >
                                                    <Link to={link}>{title}</Link>
                                                </li>
                                            );
                                        }
                                    })
                                ) : null
                            }
                            <li className={isToggleStartGuide ? 'expand' : ''} >
                                <a onClick={this.toggleStartGuide}><span className="caret"  />{titleStartGuide}</a>
                                <ul className="sub-left-nav">
                                    {this.renderDocument(listSubject,titleStartGuide)}
                                </ul>
                            </li>
                            <li onClick={this.onClickNewDoc}><a><FontAwesomeIcon icon="plus-circle" /> New a document</a></li>
                        </ul>
                    </div>
                </aside>
                <NewDocumentModal
                    isOpen = {isOpenNewDocumentModal}
                    callback = {this.callbackNewDocumentModal}
                    parentTitle = {parentTitle}
                    sendNewDocument = {this.onGetDocumentData}
                />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        leftMenu: state.Docs.leftMenu
    };
}

const mapDispatchToProps = {
    showLoading,
    hideLoading,
    getLeftMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
