import React, {Component, Fragment} from 'react';

// Components
import Examples from './components/Examples';
import PropsAndMethod from './components/PropsAndMethod';
import CopyClipBoard from 'Components/CopyClipBoard';
import Tooltip from 'Components/Tooltip';

class Index extends Component {
    constructor(props) {
        super(props);

        this.refHowToUse = React.createRef();

        this.state = {
            propsAndMethod: null,
            howToUse: null
        };
    }

    onChangeHowToUse = (e) => {
        this.setState({
            howToUse: e.target.value
        });
    };

    onChangePropsAndMethod = (data) => {
        this.setState({
            propsAndMethod: data
        });
    };

    render() {
        return (
            <Fragment>
                <div className="form-group row">
                    <label className="col-md-1 col-form-label">How to use</label>
                    <div className="col-md-11 input-group">
                        <input
                            ref={this.refHowToUse}
                            type="text"
                            className="form-control"
                            placeholder="import Accordion from 'constructicon/accordion'"
                            value="import Accordion from 'constructicon/accordion'"
                            onChange={this.onChangeHowToUse}
                        />
                        <CopyClipBoard
                            refs={this.refHowToUse}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-1 col-form-label">Description</label>
                    <div className="col-md-11">
                        <textarea className="form-control" name="textarea-input" rows="2" placeholder="Description.." />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-1 col-form-label">Props & methods</label>
                    <div className="col-md-11">
                        <PropsAndMethod
                            onChangePropsAndMethod={this.onChangePropsAndMethod}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-1 col-form-label">Examples</label>
                    <div className="col-md-11">
                        <Examples />
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Index;
