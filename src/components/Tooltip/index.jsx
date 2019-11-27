import React, {Component} from 'react';
import './styles.less';

class Tooltip extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='tooltip-div'>
                {this.props.children}
                <span className='tooltip-text'>{this.props.label}</span>
            </div>
        );
    }
}

export default Tooltip;