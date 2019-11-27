// Libraries
import React, {Component} from 'react';
import './styles.less';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'Components/CKEditor';

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'fontsize', 'fontfamily',
        '|',
        'bold', 'italic', 'underline', 'strikethrough', 'highlight',
        '|',
        'alignment',
        '|',
        'numberedList', 'bulletedList',
        '|',
        'link',
        'imageUpload',
        'mediaEmbed',
        'insertTable',
        '|',
        'blockQuote',
        'blockCode',
        '|',
        'undo',
        'redo'
    ],
    heading: {
        options: [
            {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
            {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
            {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
            {
                model: 'headingFancy',
                view: {
                    name: 'h2',
                    classes: 'fancy'
                },
                title: 'Heading 2 (manual config)',
                class: 'ck-heading_heading2_fancy',
                converterPriority: 'high'
            },
            {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'},
            {model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4'},
            {model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5'}
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
};

class Editor extends Component {
    constructor (props) {
        super (props);
        this.state = {
            //
        };
    }

    onChangeEditor = (event, editor) => {
        this.props.callback({
            content: editor.getData()
        });
    };

    render() {
        const {data} = this.props;

        return (
            <CKEditor
                data={data}
                editor={ClassicEditor}
                config={editorConfiguration}
                onChange={this.onChangeEditor}
                onInit={(editor) => {
                    editor.setData(data);
                }}
            />
        );
    }
}

export default Editor;
