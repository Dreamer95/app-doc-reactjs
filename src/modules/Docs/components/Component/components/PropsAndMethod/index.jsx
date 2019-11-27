import  React, {Component} from 'react';
import Row from 'Modules/Docs/components/Component/components/PropsAndMethod/components/Row';

class PropsAndMethod extends Component {
    constructor(props) {
        super(props);

        this.propsNamesFocus = React.createRef();
        this.typeFocus = React.createRef();
        this.defaultValueFocus = React.createRef();
        this.descriptionFocus = React.createRef();

        this.state = {
            data: [
                {
                    id: '101',
                    propsNames: 'children',
                    type: 'any',
                    defaultValue: 'required',
                    description: 'The content of the accordion'
                },
                {
                    id: '102',
                    propsNames: 'children',
                    type: 'any',
                    defaultValue: 'required',
                    description: 'The content of the accordion'
                }
            ],
            id: '',
            propsNames: {
                value: '',
                validate: false
            },
            type: {
                value: '',
                validate: false
            },
            defaultValue: {
                value: '',
                validate: false
            },
            description: {
                value: '',
                validate: false
            }
        };
    }

    componentWillUnmount() {
        this.props.onChangePropsAndMethod(this.state.data);
    }

    handleChangeInputPropsAndMethod = (e) => {
        const {propsNames, type, defaultValue, description} = this.state;

        if (e.target.name === 'propsNames') {
            this.setState({propsNames: {...propsNames, validate: false, value: e.target.value}});
        }
        
        if (e.target.name === 'type') {
            this.setState({type: {...type, validate: false, value: e.target.value}});
        }

        if (e.target.name === 'defaultValue') {
            this.setState({defaultValue: {...defaultValue, validate: false, value: e.target.value}});
        }

        if (e.target.name === 'description') {
            this.setState({description: {...description, validate: false, value: e.target.value}});
        }
    };

    handleAddPropsAndMethod = () => {
        const {propsNames, type, description, defaultValue} = this.state;

        if (description.value.trim() === '') {
            this.setState({
                description: {...description, validate: true}
            });
            this.descriptionFocus.current.focus();
        }

        if (defaultValue.value.trim() === '') {
            this.setState({
                defaultValue: {...defaultValue ,validate: true}
            });
            this.defaultValueFocus.current.focus();
        }

        if (type.value.trim() === '') {
            this.setState({
                type: {...type, validate: true}
            });
            this.typeFocus.current.focus();
        }

        if (propsNames.value.trim() === '') {
            this.setState({
                propsNames: {...propsNames, validate: true}
            });
            this.propsNamesFocus.current.focus();
        }

        this.setState(prevState => {
            if (prevState.propsNames.value.trim() !== '' && prevState.type.value.trim() !== '' && prevState.defaultValue.value.trim() !== '' && prevState.description.value.trim() !== '') {
                let id = Math.floor(Math.random() * 50) + 100;

                const addData = {
                    id: `${id}`,
                    propsNames: prevState.propsNames.value,
                    type: prevState.type.value,
                    defaultValue: prevState.defaultValue.value,
                    description: prevState.description.value
                };

                const data = [...prevState.data, addData];

                this.propsNamesFocus.current.focus();

                return {
                    data,
                    id: '',
                    propsNames: {
                        ...prevState.propsNames,
                        value: '',
                        validate: false
                    },
                    type: {
                        ...prevState.type,
                        value: '',
                        validate: false
                    },
                    defaultValue: {
                        ...prevState.defaultValue,
                        value: '',
                        validate: false
                    },
                    description: {
                        ...prevState.description,
                        value: '',
                        validate: false
                    }
                };
            }

        });
    };

    onClickRemoveRow = (id) => {
        this.setState({
            data: this.state.data.filter(cell => cell.id !== id)
        });
    };

    onClickHandleUpdate = (data) => {
        const addData = {
            id: data.id,
            propsNames: data.propsNames,
            type: data.type,
            defaultValue: data.defaultValue,
            description: data.description
        };

        this.setState(prevState => {
            return {
                data: prevState.data.map((d) => d.id === data.id ? addData : d)
            };
        });
    };

    render() {
        let rows = this.state.data.map((item, key) => {
            return (
                <tr
                    key={key}
                >
                    <Row
                        row={item}
                        onClickHandleUpdate={this.onClickHandleUpdate}
                        onClickRemoveRow={this.onClickRemoveRow}
                    />
                </tr>
            );
        });
        
        return (
            <table className="ants-document-table">
                <thead>
                    <tr>
                        <th>Prop name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr>
                        <td>
                            <input
                                ref={this.propsNamesFocus}
                                style={this.state.propsNames.validate ? {borderBottom: '2px solid red'} : {}}
                                onChange={this.handleChangeInputPropsAndMethod}
                                value={this.state.propsNames.value}
                                name={'propsNames'}
                                type="text" />
                        </td>
                        <td>
                            <input
                                ref={this.typeFocus}
                                style={this.state.type.validate ? {borderBottom: '2px solid red'} : {}}
                                onChange={this.handleChangeInputPropsAndMethod}
                                value={this.state.type.value}
                                name={'type'}
                                type="text" />
                        </td>
                        <td>
                            <input
                                ref={this.defaultValueFocus}
                                style={this.state.defaultValue.validate ? {borderBottom: '2px solid red'} : {}}
                                onChange={this.handleChangeInputPropsAndMethod}
                                value={this.state.defaultValue.value}
                                name={'defaultValue'}
                                type="text" />
                        </td>
                        <td>
                            <input
                                ref={this.descriptionFocus}
                                onChange={this.handleChangeInputPropsAndMethod}
                                style={this.state.description.validate ? {borderBottom: '2px solid red'} : {}}
                                value={this.state.description.value}
                                name={'description'}
                                type="text" />
                        </td>
                        <td style={{color: 'blue'}} onClick={this.handleAddPropsAndMethod}>Add</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default PropsAndMethod;