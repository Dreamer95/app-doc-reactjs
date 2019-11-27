import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';

import './style.less';

const propTypes = {
    data: PropTypes.oneOfType([PropTypes.arrayOf, PropTypes.object]),
    keyColor: PropTypes.string,
    stringColor: PropTypes.string,
    numberColor: PropTypes.string,
    nullColor: PropTypes.string,
    undefinedColor: PropTypes.string,
    borderLeftColor: PropTypes.string,
    boxBracketsColor: PropTypes.string,
    curlyBracketsColor: PropTypes.string,
    showBorderLeft: PropTypes.bool
};

const defaultProps = {
    data: {0: 'No data'},
    keyColor: '#000',
    stringColor: '#009900',
    numberColor: '#0000ff',
    nullColor: '#808080',
    undefinedColor: '#0000ff',
    borderLeftColor: '#A09696',
    boxBracketsColor: '#000',
    curlyBracketsColor: '#000',
    showBorderLeft: true
};

class JsonViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
        };

        this.handleToggleJson = this.handleToggleJson.bind(this);
    }

    formatValueColor = (value) => {
        const {numberColor, stringColor, nullColor, undefinedColor} = this.props;

        switch (typeof value) {
            case 'number':
                return numberColor;
            case 'string':
                return stringColor;
            case 'object':
                if(value === null){
                    return nullColor;
                }else {
                    return undefinedColor;
                }
            case 'undefined':
                return undefinedColor;
            default:
                return undefinedColor;
        }
    }

    formatValue = (value) => {
        switch (typeof value) {
            case 'number':
                return value;
            case 'string':
                return `"${value}"`;
            case 'object':
                if(value === null){
                    return 'null';
                }else {
                    return value;
                }
            case 'undefined':
                return 'undefined';
            default:
                return value;
        }
    }

    renderKeyValuePair = (value, key) => {
        const {
            keyColor,
            borderLeftColor,
            boxBracketsColor,
            curlyBracketsColor,
            showBorderLeft
        } = this.props;

        return (
            <li className={'json-viewer__key-value-wrap'} key={key}>
                {showBorderLeft ? <div style={{borderLeftColor: borderLeftColor}} className="json-viewer__line" /> : null}
                {
                    _isObject(value) ?
                        <span
                            name="arrow"
                            onClick={e => this.handleKeyValueToggle(e)}
                            className={'json-viewer__arrow-down'} />
                        :
                        null
                }
                <ul style={{color: keyColor}} className={'json-viewer__key'}>
                    {`${key}: `}
                    <span data-toggle-dummy="closed" className={'json-viewer__wrap-closed'}>
                        {
                            _isArray(value) ?
                                <span style={{color: boxBracketsColor}} className={'json-viewer__open-bracket'}>&nbsp;{'['}</span>
                                :
                                <span style={{color: curlyBracketsColor}} className={'json-viewer__open-bracket'}>&nbsp;{'{'}</span>
                        }
                        <p className={'json-viewer__dots'}>&nbsp;...</p>
                        {
                            _isArray(value) ?
                                <span style={{color: boxBracketsColor}} className={'json-viewer__open-bracket'}>&nbsp;{'],'}</span>
                                :
                                <span style={{color: curlyBracketsColor}} className={'json-viewer__open-bracket'}>&nbsp;{'},'}</span>
                        }
                    </span>
                    <span data-toggle="open" className={'json-viewer__wrap'}>
                        {
                            _isArray(value) ?
                                <Fragment>
                                    <span style={{color: boxBracketsColor}} className={'json-viewer__open-bracket'}>&nbsp;{'['}</span>
                                    {
                                        _map(value, (child, key) => {
                                            return this.renderKeyValuePair(child, key);
                                        })
                                    }
                                    <span style={{color: boxBracketsColor}} className={'json-viewer__close-bracket'}>{'],'}</span>
                                </Fragment>
                                :
                                _isObject(value) ?
                                    <Fragment>
                                        <span style={{color: curlyBracketsColor}} className={'json-viewer__open-bracket'}>&nbsp;{'{'}</span>
                                        {
                                            _map(value, (child, key) => {
                                                return this.renderKeyValuePair(child, key);
                                            })
                                        }
                                        <span style={{color: curlyBracketsColor}} className={'json-viewer__close-bracket'}>{'},'}</span>
                                    </Fragment>
                                    :
                                    <div
                                        style={{color: this.formatValueColor(value)}}
                                        className={'json-viewer__value'}>{this.formatValue(value)}
                                    </div>
                        }
                    </span>
                </ul>
            </li>
        );
    }

    handleToggleJson() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleKeyValueToggle(e) {
        let jsonParentArray = e.target.parentElement.childNodes;

        const jsonParent = _filter(jsonParentArray, child => {
            return child.className === 'json-viewer__key';
        });

        _map(jsonParent[0].childNodes, child => {
            if (child.className === 'json-viewer__wrap-closed') {
                if (child.dataset.toggleDummy === 'closed') {
                    e.target.classList.remove('json-viewer__arrow-down');
                    e.target.classList.add('json-viewer__arrow-right');
                    child.dataset.toggleDummy = 'open';
                } else {
                    e.target.classList.remove('json-viewer__arrow-right');
                    e.target.classList.add('json-viewer__arrow-down');
                    child.dataset.toggleDummy = 'closed';
                }
            }
            if (child.className === 'json-viewer__wrap') {
                if (child.dataset.toggle === 'closed') {
                    child.dataset.toggle = 'open';
                } else {
                    child.dataset.toggle = 'closed';
                }
            }
        });
    }

    render() {
        const {isOpen} = this.state;
        const {data} = this.props;

        return (
            <div className={'json-viewer__container'}>
                {!_isEmpty(data) ? <div className={`${isOpen ? 'json-viewer__arrow-down' : 'json-viewer__arrow-right'}`} onClick={this.handleToggleJson} /> : null}
                {_isObject(data) ? '{' : '['}
                {isOpen ? _map(data, (value, key) => this.renderKeyValuePair(value, key))
                    : <p className={'json-viewer__dots'}>{' ... '}</p>}
                {_isObject(data) ? '}' : ']'}
            </div>
        );
    }
}

JsonViewer.propTypes = propTypes;
JsonViewer.defaultProps = defaultProps;

export default JsonViewer;