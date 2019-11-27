import React, {Component} from 'react';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup, Input,
    InputGroup,
    InputGroupButtonDropdown,
    Label,
    Row
} from 'reactstrap';

import './styles.less';

//assets
import {random} from 'Src/utils';

//component
import JsonViewer from 'Components/JsonViewer';

// const METHOD
const APIMethods = ['GET', 'POST', 'PUT', 'DELETE'];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            splitButtonOpen: false,
            dropdownOpen: false,
            method: 'GET',
            arrParams: [{
                id: 'initID',
                key: '',
                value: '',
                isChecked: true
            }]

        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    toggleSplit = () => {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    };

    onGetMethod = (method) => {
        this.setState({
            method
        });
    }

    onAddParam = () => {
        const {arrParams} = this.state;
        const number = arrParams.length;
        const newId = random(number);

        const newParams = {
            id: newId,
            key: '',
            value: '',
            isChecked: true
        };

        this.setState({
            arrParams: [...this.state.arrParams, newParams]
        });
    }

    onRemoveParams = (id) => {
        const {arrParams} = this.state;

        if (arrParams.length > 1) {
            this.setState({
                arrParams: [...this.state.arrParams.filter(params => {
                    return params.id !== id;
                })]
            });
        }

    }

    handleOnChange = (id, target) => {

        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (id) {
            this.setState(state => {
                state.arrParams.map(param => {
                    if (param.id === id) {
                        param[name] = value;
                    }
                });
            });
        }

        this.setState({
            [name]: value
        });

    }

    renderParams = (arrParams) => {
        let result = null;

        if (arrParams.length > 0) {
            result = arrParams.map((params, index) => {
                return (
                    <Row key={index} className="form-group">
                        <Col md={1}>
                            <Input className="my-checkbox" name="isChecked" type="checkbox" id="checkbox2"
                                checked={params.isChecked}
                                onChange={(event) => this.handleOnChange(params.id, event.target)} />
                        </Col>
                        <Col md={3}>
                            <Input type="text" name="key" value={params.key} placeholder=""
                                onChange={(event) => this.handleOnChange(params.id, event.target)} />
                        </Col>
                        <Col md={6}>
                            <Input type="text" name="value" value={params.value} placeholder=""
                                onChange={(event) => this.handleOnChange(params.id, event.target)} />
                        </Col>
                        <Col hidden={arrParams.length === 1} md={1}> <a><Button close
                            onClick={() => this.onRemoveParams(params.id)} /></a>
                        </Col>
                        <Col md={1} />
                    </Row>
                );
            });
        }
        return result;
    }

    render() {
        const {method, arrParams} = this.state;

        return (
            <Container>
                <Row><Label className="label-name">METHOD</Label></Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <ButtonGroup>
                                <span>{method}</span>
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret />
                                    <DropdownMenu>
                                        {
                                            APIMethods.map((method, index) => {
                                                return (
                                                    <DropdownItem
                                                        key={index}
                                                        onClick={() => this.onGetMethod(method)}>{method}
                                                    </DropdownItem>
                                                );
                                            })
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown>

                            </ButtonGroup>
                        </FormGroup>
                    </Col>
                    <Col md={8}>
                        <input type="text" name="" id="" className="form-control" placeholder="" />
                    </Col>
                    <Col md={2}>
                        <InputGroup>
                            <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen}
                                toggle={this.toggleSplit}>
                                <Button className="btn-send" color="primary">
                                    <i className="fas fa-paper-plane" />&nbsp;
                                    Send
                                </Button>
                                <DropdownToggle split color="primary" />
                                <DropdownMenu>
                                    <DropdownItem disabled>Action</DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </InputGroup>
                    </Col>
                </Row><br />
                <div className="my-group">
                    <Row><Label className="label-name">PARAMS</Label></Row>
                    {
                        this.renderParams(arrParams)
                    }
                    <Row>
                        <Button className="my-ml-1" color="secondary" onClick={this.onAddParam}>+ Add Param</Button>
                    </Row>

                </div>
                <br />
                <Row><Label className="label-name">BODY</Label></Row>
                <Row>
                    <Col md={12}>
                        <JsonViewer />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Index;
