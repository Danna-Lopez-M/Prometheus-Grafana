import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        user: Omit<User, 'password'>;
        passwordChanged: boolean;
    }>;
    remove(id: string): Promise<void>;
    findByEmail(email: string, withPassword?: boolean): Promise<User | null>;
    updateUserRoles(id: string, roles: string[]): Promise<User>;
    toggleUserStatus(id: string): Promise<User>;
    private handleDBExceptions;
}
