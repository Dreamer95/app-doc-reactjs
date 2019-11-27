import React, {Component, Fragment} from 'react';
import '../../styles.less';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                'https://st.tuoitreplus.com/upload/2018/09/320x180/9625iwz451.jpg',
                'https://st.tuoitreplus.com/upload/2018/09/320x180/9625iwz451.jpg',
                'https://st.tuoitreplus.com/upload/2018/09/320x180/9625iwz451.jpg',
                'https://st.tuoitreplus.com/upload/2018/09/320x180/9625iwz451.jpg',
                'https://st.tuoitreplus.com/upload/2018/09/320x180/9625iwz451.jpg'
            ]
        };
    }

    render() {
        const {images} = this.state;

        return (
            <Fragment>
                <div className="media-library">
                    {images.map((url, index) => {
                        return (
                            <div key={`${url}-${index}`} className={'media-library-image'}>
                                <div className={'centered'}>
                                    <a className={'media-upload-list-item-thumbnail'} href={url} target={'_blank'} rel="noopener noreferrer">
                                        <img src={url} alt={url} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}

export default Media;
