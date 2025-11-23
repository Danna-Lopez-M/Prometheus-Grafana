import { User } from '../users/entities/user.entity';
import { ContractService } from './contract.service';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    findAll(): Promise<import("./entities/contract.entity").Contract[]>;
    findMyContracts(user: User): Promise<import("./entities/contract.entity").Contract[]>;
    findOne(id: string, user: User): Promise<import("./dto/contract-detail.dto").ContractDetailDto>;
}
