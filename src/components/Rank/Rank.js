import React from 'react';
const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='f3 pt4'>
                {name + ' enteries are'}
            </div>
            <div className='f4 pb4'>
                {entries}
            </div>
        </div>
    )
}
export default Rank;