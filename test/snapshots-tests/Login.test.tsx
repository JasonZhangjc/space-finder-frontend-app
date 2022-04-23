import { Login } from '../../src/components/Login'
import { create } from 'react-test-renderer'

// create a snapshot for a component
// and check it for changes or not
// i.e. compare program to the component


// npm test -- -u
// updates the snapshot

describe('Login component snapshot testing', ()=>{

    test('initial test', ()=>{
        const snap = create(<Login 
            authService={{}as any}
            setUser={{}as any}
        />)
        expect(snap).toMatchSnapshot();
    })

})