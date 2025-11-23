import { Contract } from './entities/contract.entity';
import { User } from '../users/entities/user.entity';
import { RentalContract } from '../rentals/entities/rental.entity';
import { Repository } from 'typeorm';
import { ContractDetailDto } from './dto/contract-detail.dto';
export declare class ContractService {
    private readonly contractRepo;
    constructor(contractRepo: Repository<Contract>);
    createFromRental(user: User, rental: RentalContract): Promise<Contract>;
    findAll(): Promise<Contract[]>;
    findByUser(userId: string): Promise<Contract[]>;
    findOne(id: string, user?: User): Promise<ContractDetailDto>;
}
