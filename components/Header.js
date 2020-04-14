import React from 'react';
import NavBar from './NavBar'

const Header = () => {
    return (
        <div className="bg-gray-200">
            <div>
            <img 
                className="h-24 mx-auto py-4"
                src="/logo.png"
                alt="My daily status"
                height="80"
            />
            </div>
            <NavBar />
        </div>
    )
}

export default Header;