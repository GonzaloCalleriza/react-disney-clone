import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import logo from '../public/disney.png'

const NavBar = ({ account }) => {
    return (
        <div className='navbar' >
            <Link href='/' passHref >
                <Image src={logo} alt='Disney Logo' width={120} height={50} />
            </Link>
            <div className='account-info'>
                <p>Welcome {account.username}!!!</p>
                <Image className='avatar' src={account.avatar.url} alt='user-avatar' />
            </div>
        </div>
    );
}

export default NavBar;
