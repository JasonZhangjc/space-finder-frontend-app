// Define interface in ./model

// This is for the 'AppState' interface in App.tsx.
export interface User {
    userName: string,
    email: string
}

// this is for the 'profile' page
export interface UserAttribute {
    Name: string,
    Value: string
}

// this is for the 'space' part
export interface Space {
    spaceId: string,
    name: string,
    location: string,
    // '?' means an optional property
    photoUrl?: string,
}