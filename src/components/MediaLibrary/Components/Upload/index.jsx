import React, {Component, Fragment} from 'react';
import produce from 'immer';

// Services
import * as uploadService from 'Services/Upload';

// Assets
import '../../styles.less';
import {appConfig} from 'Src/constant';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            images: []
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            if (this.props.isActive) {
                window.addEventListener('paste', (event) => {this.onPasteItem(event)});
            } else {
                window.removeEventListener('paste', (event) => {this.onPasteItem(event)});
            }
        }
    }

    validateFile = (params) => {
        const {file, maxFileSize, extensions} = params;

        const fileExtension = file.name.split('.').pop();

        const isFileSizeValid = file.size < maxFileSize * 1024 * 1024; // in MB
        const isExtensionValid = extensions.includes(fileExtension);

        let error = {};

        if (!isFileSizeValid) {
            error.sizeErrorMessage = 'File size is too big';
        }

        if (!isExtensionValid) {
            error.extErrorMessage = 'Invalid file type';
        }

        return {
            isValid: isFileSizeValid && isExtensionValid,
            error
        };
    };

    onPasteItem = (event) => {
        let result = [];

        if (event.clipboardData.types) {
            const length = event.clipboardData.types.length;

            for (let index = 0; index < length; index++) {
                if (event.clipboardData.types[index] === 'Files' && event.clipboardData.items && event.clipboardData.items[index]) {
                    const files = event.clipboardData.items[index].getAsFile();

                    if (files) {
                        result.push(files);
                        break;
                    }
                }
            }
        }

        if (result.length) {
            this.handleFileSelect(result);
        }
    };

    onDropFile = (event) => {
        event.preventDefault();

        const files = event.dataTransfer.files;

        this.handleFileSelect(files);
    };

    onChangeSelectFile = (event) => {
        const files = event.target.files;

        this.handleFileSelect(files);
    };

    handleFileSelect = (files) => {
        const {params} = this.props;
        const fileParamName = 'file_upload';
        const maxFileSize = 6;
        const extensions = ['jpg', 'png', 'gif'];

        const fileList = Object.keys(files).map((file) => {
            return files[file];
        });

        if (fileList[0]) {
            const validateFilePayload = {
                file: fileList[0],
                maxFileSize,
                extensions
            };
            const validateFileInput = this.validateFile(validateFilePayload);

            if (validateFileInput.isValid) {
                let formData = new FormData();

                formData.append(fileParamName, fileList[0]);

                let uploadFile = uploadService.upload({params, formData});

                if (uploadFile) {
                    uploadFile.then((response) => {
                        if (response.data && response.data.data) {
                            const {url, file_name} = response.data.data;

                            this.setState(produce(this.state, (draftState) => {
                                const {images} = draftState;
                                const isImgExist = images.some((image) => {
                                    if (image && image.url) {
                                        return image.url === url;
                                    }
                                });

                                if (!isImgExist) {
                                    draftState.images.push({
                                        url,
                                        fileName: file_name
                                    });
                                }
                            }));
                        }
                    });
                }
            }
        }
    };

    handleDragOver = (event) => {
        if ('preventDefault' in event) {
            event.stopPropagation();
            event.preventDefault();
        }

        let hover = false;

        if (event.type === 'dragover') {
            hover = true;
        }

        this.setState({
            hover: hover
        });
    };

    selectFile = () => {
        this.input.click();
    };

    render() {
        const {hover, images} = this.state;

        return (
            <Fragment>
                <div
                    className='media-upload media-upload-drag'
                    style={hover ? {backgroundColor: '#f1f1f1', borderColor: '#adecfe'} : {}}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragOver}
                    onDrop={this.onDropFile}
                    onClick={this.selectFile}
                >
                    <span className='media-upload-btn' role='button'>
                        <input
                            type='file'
                            tabIndex='-1'
                            ref={(ref) => (this.input = ref)}
                            name={'file-upload'}
                            style={{display: 'none'}}
                            multiple={false}
                            onChange={this.onChangeSelectFile}
                        />
                        <div className='media-upload-drag-container'>
                            <p className="media-upload-drag-icon">
                                <i aria-label="icon: inbox" className="icon-drawer" />
                            </p>
                            <p className="media-upload-text">Click or drag file to this area to upload</p>
                        </div>
                    </span>
                </div>

                <div className="media-upload-list">
                    {
                        images.map((image, index) => {
                            const url = `${appConfig.ST_URL_UPLOAD}${image.url}`;
                            const {fileName} = image;

                            return (
                                <div key={`${image}-${index}`} className='media-upload-list-item'>
                                    <div className='media-upload-list-item-info'>
                                        <span>
                                            <a className='media-upload-list-item-thumbnail'
                                                href={url}
                                                target='_blank' rel='noopener noreferrer'>
                                                <figure>
                                                    <img src={url} alt={url} />
                                                </figure>
                                            </a>
                                            <a
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='media-upload-list-item-name'
                                                title={url}
                                                href={url}
                                            >
                                                {fileName}
                                            </a>
                                        </span>
                                    </div>
                                    <i aria-label='icon: close' title='Remove file' className='media-icon-remove fa fa-remove' />
                                </div>
                            );
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default Upload;
