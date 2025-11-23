export declare class User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    dni: string;
    phone: string;
    isActive: boolean;
    roles: string[];
    checkEmail(): void;
    checkEmailUpdate(): void;
}
