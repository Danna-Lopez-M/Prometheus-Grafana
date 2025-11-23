import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        token: string;
        id: string;
        fullName: string;
        email: string;
        password?: string;
        dni?: string;
        phone?: string;
        isActive: boolean;
        roles: string[];
        contracts: import("../rentals/entities/rental.entity").RentalContract[];
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        dni?: string;
        phone?: string;
        isActive: boolean;
        roles: string[];
        contracts: import("../rentals/entities/rental.entity").RentalContract[];
    }>;
    checkAuthStatus(user: User): {
        user: User;
        message: string;
    };
    adminDashboard(user: User): {
        user: User;
        message: string;
    };
    salesDashboard(user: User): {
        user: User;
        message: string;
    };
}
