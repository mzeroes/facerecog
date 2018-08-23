import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='center form pa4 mt4 br1 shadow-2'>
            <input className='w-70 pa2 bw0' type='text' onChange={onInputChange} />
            <button className='w-30 pa2 bw0' onClick={onButtonSubmit}>Detect</button>
        </div>
    )
}

export default ImageLinkForm;