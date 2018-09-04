import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
	return(
		<div>
		<p className="f3">
		{'This Magic App Can Detect Your Face'}
		</p>
		<div className='center form pa4 br3 shadow-5'>
		<div className='center'>
		<input className=' f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
		<button className='w-30 grow f4 link ph3 dib white bg-light-purple'onClick={onButtonSubmit}>Detect</button>
		</div>
		</div>
</div>
		)
}

export default ImageLinkForm;