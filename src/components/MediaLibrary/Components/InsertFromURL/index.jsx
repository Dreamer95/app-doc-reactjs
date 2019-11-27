import React, {Component, Fragment} from 'react';
import '../../styles.less';
import {CardBody, FormGroup, Input, Button} from 'reactstrap';
import produce from 'immer';

class InsertFromURL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            images: []
        };
    }

    onChangeInput = (event) => {
        const url = event.target.value;

        this.setState({
            url
        }, () => {
            const isURLValid = url.match(/\.(jpeg|jpg|gif|png)$/) != null;

            if (isURLValid) {
                this.setState(produce(this.state, (draftState) => {
                    draftState.images[0] = url;
                }));
            } else {
                this.setState(produce(this.state, (draftState) => {
                    draftState.images = [];
                }));
            }
        });
    };

    onClickCancel = () => {
        this.setState({
            images: []
        });
    };

    render() {
        const {url, images} = this.state;

        return (
            <Fragment>
                <CardBody>
                    <FormGroup row>
                        <Input
                            type='text'
                            name='text-input'
                            placeholder='http://example.com/images.png'
                            value={url}
                            onChange={this.onChangeInput}
                        />
                    </FormGroup>
                    <FormGroup row>
                        {
                            images.length ? (
                                images.map((imgURL, index) => {
                                    return (
                                        <div key={`${imgURL}-${index}`} className='media-insert-preview mr-5'>
                                            <img className='media-image' style={{maxWidth: 150}} src={imgURL} alt={imgURL} />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='media-insert-preview mr-5'>
                                    <img
                                        className='media-image'
                                        style={{maxWidth: 150}}
                                        src={'https://st.tuoitreplus.com/images/no_image.png'}
                                        alt={'https://st.tuoitreplus.com/images/no_image.png'}
                                    />
                                </div>
                            )
                        }
                    </FormGroup>
                    <div className='form-actions'>
                        <div className='row'>
                            <Button className='mr-1' type='submit' color='primary'>Upload file</Button>
                            <Button color='secondary' onClick={this.onClickCancel}>Cancel</Button>
                        </div>
                    </div>
                </CardBody>
            </Fragment>
        );
    }
}

export default InsertFromURL;
