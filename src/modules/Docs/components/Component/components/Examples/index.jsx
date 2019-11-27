import React, {Component, Fragment} from 'react';

class Index extends Component {
    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Standard Use"
                    />
                </div>
                <div className="form-group">
                    <textarea className="form-control" name="textarea-input" rows="2" placeholder="Description.." />
                </div>
                <div className="form-group">

                </div>
                <div className="form-group">
                    <label className="col-form-label">VIEW CODE</label>

                </div>
            </Fragment>
        );
    }
}

export default Index;
