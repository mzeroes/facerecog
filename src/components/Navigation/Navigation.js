import React from 'react';

const Navigation = ({ onRouteChange, route }) => {
  if (route === 'signin') {
    return (
      <div>
        <nav className="pa3" style={{ float: 'right' }}>
          <p onClick={() => onRouteChange('register')}
            className='f5 link dim black pointer white'>Register</p>
        </nav>
      </div>
    )
  }
  else if (route === 'register') {
    return (
      <div>
        <nav className="pa3" style={{ float: 'right' }}>
          <p onClick={() => onRouteChange('signin')}
            className='f5 link dim black pointer white'>Sign In</p>
        </nav>
      </div>
    )

  } else {
    return (
      <div>
        <nav className="pa3" style={{ float: 'right' }}>
          <p onClick={() => onRouteChange('logout')}
            className='f5 link dim black pointer white'>Log out</p>
        </nav>
      </div>
    )
  }
}
export default Navigation;