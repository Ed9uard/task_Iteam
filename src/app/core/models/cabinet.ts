export interface Framework {
    code: string;
    name: string;
}

export interface FrameworkVersion {
    [key: string]: string[];
}


export interface UserProfile {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    framework: string;
    frameworkVersion: string;
    email: string;
    hobby: Hobby[];
}

export interface Hobby {
    name: string;
    duration: string;
}