import React, {Component, Fragment} from 'react';
import Editor from 'Components/Editor';

class Index extends Component {
    callbackEditor = (callback) => {
        if (callback) {
            if (callback.content) {
                this.props.callback({
                    content: callback.content
                });
            }
        }
    };

    render() {
        const {content} = this.props;

        return (
            <Fragment>
                <div className="form-group row">
                    <label className="col-md-1 col-form-label">Content</label>
                    <div className="col-md-11">
                        <button type="button" style={{marginBottom: 10}} className="btn btn-sm btn-primary">
                            Media library
                        </button>
                        <Editor
                            data={content}
                            callback={this.callbackEditor}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Index;
