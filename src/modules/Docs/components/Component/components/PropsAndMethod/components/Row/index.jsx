import React, {Fragment, Component} from 'react';

class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            propsNames: {
                editing: false,
                value: ''
            },
            type: {
                editing: false,
                value: ''
            },
            defaultValue: {
                editing: false,
                value: ''
            },
            description: {
                editing: false,
                value: ''
            }
        };
    }

    UNSAFE_componentWillMount() {
        const {id, propsNames, type, defaultValue, description} = this.props.row;

        this.setState(
            prevState => {
                return {
                    id: id,
                    propsNames: {...prevState.propsNames, value: propsNames},
                    type: {...prevState.type, value: type},
                    defaultValue: {...prevState.defaultValue, value: defaultValue},
                    description: {...prevState.description, value: description}
                };
            }
        );
    }

    onClickEditingCellPropsNames = () => {
        this.setState({
            propsNames: {...this.state.propsNames, editing: true},
            editing: true
        });
    };

    onClickEditingCellType = () => {
        this.setState({
            type: {...this.state.type, editing: true},
            editing: true
        });
    };

    onClickEditingCellDefaultValue = () => {
        this.setState({
            defaultValue: {...this.state.defaultValue, editing: true},
            editing: true
        });

    };

    onClickEditingCellDescription = () => {
        this.setState({
            description: {...this.state.description, editing: true},
            editing: true
        });

    };

    onClickRemoveRow = () => {
        this.props.onClickRemoveRow(this.state.id);
    };

    onBlurHandleUpdate = (e) => {
        const {id, propsNames, defaultValue, description, type} = this.state;

        this.setState(prevState => {
            return {
                propsNames: {...prevState.propsNames, editing: false},
                type: {...prevState.type, editing: false},
                defaultValue: {...prevState.defaultValue, editing: false},
                description: {...prevState.description, editing: false},
                editing: false
            };
        });

        this.props.onClickHandleUpdate({
            id: id,
            propsNames: propsNames.value,
            defaultValue: defaultValue.value,
            description: description.value,
            type: type.value
        });
    };

    onChangeEditingCell = (e) => {
        if (e.target.name === 'propsNames') {
            this.setState({
                propsNames: {...this.state.propsNames, value: e.target.value}
            });
        }

        if (e.target.name === 'type') {
            this.setState({
                type: {...this.state.type, value: e.target.value}
            });
        }

        if (e.target.name === 'defaultValue') {
            this.setState({
                defaultValue: {...this.state.defaultValue, value: e.target.value}
            });
        }

        if (e.target.name === 'description') {
            this.setState({
                description: {...this.state.description, value: e.target.value}
            });
        }
    };

    render() {
        const {propsNames, type, defaultValue, description} = this.state;

        return (
            <Fragment>
                <td onClick={this.onClickEditingCellPropsNames}>
                    {
                        propsNames.editing ? <input
                            style={{border: '2px solid blue', padding: '5px'} }
                            type='text'
                            name='propsNames'
                            autoFocus={true}
                            defaultValue={this.state.propsNames.value}
                            onBlur={this.onBlurHandleUpdate}
                            onChange={this.onChangeEditingCell}
                        /> :
                            <span >{this.state.propsNames.value}</span>
                    }
                </td>
                <td onClick={this.onClickEditingCellType}>
                    {
                        type.editing ? <input
                            style={{border: '2px solid blue', padding: '5px'} }
                            type='text'
                            name='type'
                            autoFocus={true}
                            defaultValue={this.state.type.value}
                            onBlur={this.onBlurHandleUpdate}
                            onChange={this.onChangeEditingCell} /> : <span>{this.state.type.value}</span>
                    }
                </td>
                <td onClick={this.onClickEditingCellDefaultValue}>
                    {
                        defaultValue.editing ? <input
                            style={{border: '2px solid blue', padding: '5px'} }
                            type='text'
                            name='defaultValue'
                            autoFocus={true}
                            onBlur={this.onBlurHandleUpdate}
                            defaultValue={this.state.defaultValue.value}
                            onChange={this.onChangeEditingCell}
                        /> : <span>{this.state.defaultValue.value}</span>
                    }
                </td>
                <td onClick={this.onClickEditingCellDescription}>
                    {
                        description.editing ? <input
                            style={{border: '2px solid blue', padding: '5px'} }
                            type='text'
                            name='description'
                            autoFocus={true}
                            defaultValue={this.state.description.value}
                            onBlur={this.onBlurHandleUpdate}
                            onChange={this.onChangeEditingCell}
                        /> : <span >{this.state.description.value}</span>
                    }
                </td>
                <td onClick={this.onClickRemoveRow} style={{color: 'blue'}}>{'remove'}</td>
            </Fragment>
        );
    }
}

export default Row;