import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly rolesService;
    private readonly jwtService;
    constructor(usersService: UsersService, rolesService: RolesService, jwtService: JwtService);
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
    validateUser(id: string): Promise<User>;
    private getJwtToken;
    private handleDBExceptions;
}
