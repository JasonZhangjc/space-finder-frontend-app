import { User, UserAttribute } from '../model/Model'

// Define class in ./services

export class AuthService {

    public async login(userName: string, password: string):Promise<User | undefined> {
        // Promise is enforcing the return type is User or undefined
        if (userName === 'user' && password === '1234') {
            return {
                userName: userName,
                email: 'some@email.com'
            }
        } else {
            return undefined
        }
    }

    // The following information will be shown on the Profile page
    public async getUserAttributes(user: User):Promise<UserAttribute[]>{
        const result: UserAttribute[] = [];
        result.push({
            Name: 'description',
            Value: 'Best user ever!'
        });
        result.push({
            Name: 'job',
            Value: 'Engineer'
        });
        result.push({
            Name: 'age',
            Value: '25'
        });
        result.push({
            Name: 'experience',
            Value: '3 years'
        });
        return result
    }
}