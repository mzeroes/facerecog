import React from 'react';

const Navigation = ({ onRouteChange, route }) => {
    return (
        <div>
            <nav className="pa3" style={{ float: 'right' }}>
                {route === 'signin' ?
                    <p onClick={() => onRouteChange('Register')} className='f5 link dim black pointer white'>Register</p>
                    : (route === 'register'
                        ? <p onClick={() => onRouteChange('signin')} className='f5 link dim black pointer white'>Sign In</p>
                        :
                        <p onClick={() => onRouteChange('signin')} className='f5 link dim black pointer white'>Sign Out</p>
                    )
                }
            </nav>
        </div >
    )
}
export default Navigation;