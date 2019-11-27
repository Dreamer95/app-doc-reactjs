// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import produce from 'immer';
import {withRouter} from 'react-router';
import hljs from 'highlight.js';
import 'highlight.js/styles/atelier-forest-light.css';

// Actions
import {updateDocs} from 'Modules/Docs/actions';
import {showLoading, hideLoading} from 'Modules/Layouts/actions';

// Assets
import './styles.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getLinkFromState, getMatchFromPath} from 'Src/utils';

// Services
import * as DocumentService from 'Services/Document';
import Tooltip from 'Components/Tooltip';

class View extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: '1563001648'
        };
    }

    componentDidMount() {
        const pathInfo = getMatchFromPath(this.props.history.location.pathname);

        const {params} = pathInfo;
        const {docId} = params;

        let newState = {};

        if (docId) {
            newState.id = docId;
        }

        if (Object.keys(newState).length) {
            this.setState(newState, () => {
                this.getDocument();
            });
        }
        this.updateCodeSyntaxHighlighting();
    }

    componentDidUpdate() {
        const {id} = this.state;
        const routeInfo = getMatchFromPath(this.props.history.location.pathname);
        const {params} = routeInfo;
        const {docId} = params;
        let newState = {};
        let isUpdateDoc = false;

        if (docId !== id) {
            newState.id = docId;
            isUpdateDoc = true;
        }

        if (Object.keys(newState).length) {
            this.setState(newState, () => {
                if (isUpdateDoc) {
                    this.getDocument();
                }
            });
        }
        this.updateCodeSyntaxHighlighting();
    }

    getDocument() {
        const {documents, updateDocs, showLoading, hideLoading} = this.props;
        let {id} = this.state;

        const document = documents[id];

        if (!document && id) {
            const getDocument = DocumentService.get({
                id: id,
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

                            if (document_title) {
                                updateDocs({
                                    documents: produce(documents, (draftDocs) => {
                                        draftDocs[id] = {
                                            title: document_title,
                                            content
                                        };
                                    })
                                });
                            }
                        }
                    }
                });
            }
        }
    }

    onClickEdit = () => {
        let {id} = this.state;
        const link = getLinkFromState('documents.edit', {
            docId: id
        });

        if (link) {
            this.props.history.push(link);
        }
    };

    onClickDelete = (id) => {
        if(confirm('Do you want to delete this title ?')){ //eslint-disable-line
            //call api to delete
        }
    }

    updateCodeSyntaxHighlighting = () => {
        //hljs.registerLanguage('javascript', javascript);

        document.querySelectorAll('blockcode p').forEach(block => {
            //const html = block.toString()
            //console.log(typeof (block),block)
            hljs.highlightBlock(block);
        });
    }

    render() {
        let {id} = this.state;
        const {documents} = this.props;

        const document = documents[id];

        const title = document && document.title ? document.title : '';
        const content = document && document.content ? document.content : '';

        return (
            <React.Fragment>
                <div style={{padding: 20, position: 'relative'}}>
                    <h1 className="ants-component-title">{title}</h1>
                    <span className="ants-component-edit" onClick={this.onClickEdit}>
                        <Tooltip label={'Edit Documentation'}>
                            <FontAwesomeIcon icon="edit" />
                        </Tooltip>
                    </span>
                    <span className="ants-component-edit" onClick={this.onClickEdit}><FontAwesomeIcon icon="edit" /></span>
                    <span className="ants-component-delete" onClick={()=>this.onClickDelete(id)}><FontAwesomeIcon icon="trash" /></span>
                    <div className="ants-document-content">
                        <div dangerouslySetInnerHTML={{__html: content}} />
                    </div>
                </div>
            </React.Fragment>
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
    showLoading,
    hideLoading
};

View = connect(mapStateToProps, mapDispatchToProps)(View);

export default withRouter(View);
