import { RentalContract } from '../../rentals/entities/rental.entity';
export declare class User {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    dni?: string;
    phone?: string;
    isActive: boolean;
    roles: string[];
    contracts: RentalContract[];
}
