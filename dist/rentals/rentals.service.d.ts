import { Repository } from 'typeorm';
import { RentalContract } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { EquipmentsService } from '../equipments/equipments.service';
import { User } from '../users/entities/user.entity';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { FilterRentalsDto } from './dto/filter-rental.dto';
import { Contract } from '../contract/entities/contract.entity';
import { ContractService } from '../contract/contract.service';
export declare class RentalsService {
    private readonly rentalRepository;
    private readonly contractRepo;
    private readonly equipmentService;
    private readonly contractService;
    private readonly logger;
    constructor(rentalRepository: Repository<RentalContract>, contractRepo: Repository<Contract>, equipmentService: EquipmentsService, contractService: ContractService);
    createRequest(clientId: string, createRentalDto: CreateRentalDto): Promise<{
        rentalContract: RentalContract;
        contract: Contract;
    }>;
    findByClient(clientId: string): Promise<RentalContract[]>;
    findAll(filterDto: FilterRentalsDto): Promise<RentalContract[]>;
    updateStatus(id: string, updateDto: UpdateRentalStatusDto, user: User): Promise<RentalContract>;
    getActiveDeliveries(): Promise<RentalContract[]>;
    getRentalMetrics(): Promise<{
        active: number;
        pending: number;
        revenue: number;
    }>;
}
