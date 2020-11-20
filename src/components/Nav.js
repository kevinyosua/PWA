import React from 'react';
import { Icon, Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';

function Nav() {

    return(
        <Navbar
            alignLinks="left"
            brand={<a className="brand-logo" href="/">Goool</a>}
            className="#40c4ff light-blue accent-2"
            centerLogo
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}
        >
            <NavLink className="sidenav-close" to='/'>Beranda</NavLink>
            <NavLink className="sidenav-close" to='/save'>Tim Favorit</NavLink>
        </Navbar>
    )
}

export default Nav;