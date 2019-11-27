// Libraries
import React, {Component, Fragment} from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';

// Components
import InsertFromURL from './Components/InsertFromURL/index';
import Media from './Components/Media/index';
import Upload from './Components/Upload/index';

// Assets
import './styles.less';

const defaultProps = {
    settings: {
        tabs: [
            {key: 1, label: 'Media'},
            {key: 2, label: 'Upload Files'},
            {key: 3, label: 'Insert from URL'}
        ]
    }
};

class MediaLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            activeTab: 1
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    toggleTag = (key) => {
        this.setState({
            activeTab: key
        });
    };

    tabPane = () => {
        const {activeTab} = this.state;
        const callbackMedia = (callback) => {
            if (callback) {
                //
            }
        };

        const callbackUpload = (callback) => {
            if (callback) {
                //
            }
        };

        const callbackInsertFromURL = (callback) => {
            if (callback) {
                //
            }
        };

        return (
            <Fragment>
                <TabPane tabId={1}>
                    <Media callback={callbackMedia} isActive={activeTab === 1} />
                </TabPane>
                <TabPane tabId={2}>
                    <Upload callback={callbackUpload} isActive={activeTab === 2} />
                </TabPane>
                <TabPane tabId={3}>
                    <InsertFromURL callback={callbackInsertFromURL} isActive={activeTab === 3} />
                </TabPane>
            </Fragment>
        );
    };

    render() {
        const {isOpen, activeTab} = this.state;
        const {className} = this.props;
        const {settings} = defaultProps;
        const {tabs} = settings;

        return (
            <Modal
                isOpen={isOpen}
                toggle={this.toggle}
                className={'modal-lg ' + className}
                style={{
                    width: 800,
                    top: '15%'
                }}
            >
                <ModalHeader toggle={this.toggle}>Media Library</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        {
                            tabs.map((tab) => {
                                if (tab.key && tab.label) {
                                    const {key, label} = tab;

                                    return (
                                        <NavItem key={key}>
                                            <NavLink
                                                active={activeTab === key}
                                                onClick={() => {this.toggleTag(key)}}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <i className='icon-picture' />
                                                <span>{label}</span>
                                            </NavLink>
                                        </NavItem>
                                    );
                                }
                            })
                        }
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        {this.tabPane()}
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-approve-post' color='primary'>Apply</Button>
                    <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

MediaLibrary.defaultProps = defaultProps;

export default MediaLibrary;
