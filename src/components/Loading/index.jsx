import React, {Component} from 'react';
import './styles.less';

const defaultProps = {
    top: 0,
    marginTop: 0,
    isShowLoading: true,
    loading: {},
    loadingIcon: {}
};

class Loading extends Component {
    render() {
        return (
            <div className="loading" style={{top: this.props.top, paddingTop: this.props.paddingTop, zIndex: 3, marginTop: this.props.marginTop, ...this.props.loading}}>
                <div className="loading-icon" style={{marginTop: this.props.marginTop, marginLeft: 'auto', marginRight: 'auto', ...this.props.loadingIcon}} />
                {
                    this.props.isShowLoading && <div className="text-center font-weight-bold">Loading ...</div>
                }
            </div>
        );
    }
}

Loading.defaultProps = defaultProps;

export default Loading;
