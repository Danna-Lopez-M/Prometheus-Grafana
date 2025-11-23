import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        user: Omit<User, "password">;
        passwordChanged: boolean;
    }>;
    remove(id: string): Promise<void>;
}
