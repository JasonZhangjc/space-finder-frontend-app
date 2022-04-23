import * as ReactDOM from 'react-dom';
import { Login } from '../../src/components/Login';
import { fireEvent, waitFor } from '@testing-library/react'
import { User } from '../../src/model/Model';
import history from '../../src/utils/history';


const someUser: User = {
    userName: 'someUser',
    email: 'someEmail'
}


describe('Login component test suite', () => {

    // HTMLDivElement is something in the <div></div>
    let container: HTMLDivElement;

    // mock for authService
    const authServiceMock = {
        // jest.fn() creates a mock function
        login: jest.fn()
    }

    // mock for setUser
    const setUserMock = jest.fn();

    const historyMock = history;
    history.push = jest.fn();

    // this is a hook
    beforeEach(() => {
        // container is a HTMLDivElement
        // container holds the component
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(
            // call authService is not good in testing
            // Use mock to mock the authService
            <Login authService={authServiceMock as any} setUser={setUserMock}/>,
            container
        )
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    })

    test('Renders correctly initial document', () => {
        const title = document.querySelector('h2');
        // expect is our expectation
        // what the output is supposed to be
        expect(title!.textContent).toBe('Please login');

        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');

        const label = document.querySelector('label');
        expect(label).not.toBeInTheDocument();
    })

    // create a new test
    test('Passes credentials correclty', ()=>{
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        expect(authServiceMock.login).toBeCalledWith(
            'someUser',
            'somePass'
        )
    })

    // Mock services
    test('Correclty handles login success', async ()=>{
        authServiceMock.login.mockResolvedValueOnce(someUser);
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        // in fact, the code 'toBeCalledWith' is very
        // easy to understand
        const statusLabel = await waitFor(()=> container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login successful');
        expect(setUserMock).toBeCalledWith(someUser)
        expect(historyMock.push).toBeCalledWith('/profile')
    });

    test('Correclty handles login fail', async ()=>{
        authServiceMock.login.mockResolvedValueOnce(undefined);
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(()=> container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login failed');
    });




})