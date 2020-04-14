import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children }) => {
    return (
        <Link href={href}>
            <a  className="p-2 hover:underline hover:text-white">{children}</a>
        </Link>
    )
} 

const NavBar = () => {
    return (
        <div className="bg-gray-500 py-4 text-center">
            <NavLink href="/sobre">Sobre</NavLink>
            <NavLink href="/app">Resultado</NavLink>
            <NavLink href="/create-status">Atualizar</NavLink>
            <NavLink href="/api/logout">Logout</NavLink>
        </div>
    )
}

export default NavBar