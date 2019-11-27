import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import Tooltip from 'Components/Tooltip';

const CopyClipBoard = function ({refs}) {

    function onClickHandleCopyValueClipBoard() {
        refs.current.select();
        document.execCommand('copy');
    }

    return (
        <button id='tooltip-input-clipboard' onClick={onClickHandleCopyValueClipBoard}>
            <Tooltip label={'Copy to clipboard'} >
                <FontAwesomeIcon icon={faCopy} />
            </Tooltip>
        </button>
    );
};

export default CopyClipBoard;