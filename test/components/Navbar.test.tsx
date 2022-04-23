import { Navbar } from '../../src/components/Navbar';
import ReactDOM from 'react-dom';
import { User } from '../../src/model/Model';
import { StaticRouter } from 'react-router'
import { getByTestId } from '@testing-library/react'

describe('Navbar test suite', () => {

    // Don't have beforeEach
    // Only has many tests and afterEach

    let container: HTMLDivElement
    const someUser: User = {
        email: 'someEmail',
        userName: 'someUserName'
    }
    const baseLink = 'http://localhost';

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove()
    })


    test('renders correctly with user', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            // StaticRouter can handle the case when
            // Links are only in Navbar.tsx
            <StaticRouter>
                <Navbar user={someUser} />
            </StaticRouter>
            , container);
        
        // This implementation bas a big drawback
        // The order of the following 'expect' has to be
        // the same as the order of Links in Navbar.tsx
        // Otherwise, there would be an error
        // Use the next 'test' with 'data test' to overcome the drawback!
        const links = container.querySelectorAll('a');
        expect(links[0].href).toBe(baseLink + '/')
        expect(links[1].href).toBe(baseLink + '/profile')
        expect(links[2].href).toBe(baseLink + '/spaces')
        expect(links[3].href).toBe(baseLink + '/logout')
    })


    // Use data test here
    // for home, profile, and spaces pages
    // getByTestId is the key function
    // The drawback of data test is that
    // we need to do a little more work in 
    // Navbar.tsx and Navbar.test.tsx
    test('renders correctly with user using data test', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <StaticRouter>
                <Navbar user={someUser} />
            </StaticRouter>
            , container);
        
        // test home page
        const homeLink = getByTestId(container, 'home-link') as HTMLAnchorElement;
        expect(homeLink.href).toBe(baseLink + '/');
        
        // test profile page
        const profileLink = getByTestId(container, 'profile-link') as HTMLAnchorElement;
        expect(profileLink.href).toBe(baseLink + '/profile');
        
        // test spaces page
        const spacesLink = getByTestId(container, 'spaces-link') as HTMLAnchorElement;
        expect(spacesLink.href).toBe(baseLink + '/spaces');
    })

    
    // for login page only
    // without user information
    test('renders correctly without user using data test', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <StaticRouter>
                <Navbar user={undefined} />
            </StaticRouter>
            , container);

        // test login page
        const loginLink = getByTestId(container, 'login-link') as HTMLAnchorElement;
        expect(loginLink.href).toBe(baseLink + '/login');
    })


})