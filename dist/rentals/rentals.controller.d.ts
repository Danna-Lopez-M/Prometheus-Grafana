import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { User } from '../users/entities/user.entity';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { FilterRentalsDto } from './dto/filter-rental.dto';
export declare class RentalsController {
    private readonly rentalsService;
    constructor(rentalsService: RentalsService);
    createRequest(createRentalDto: CreateRentalDto, client: User): Promise<{
        rentalContract: import("./entities/rental.entity").RentalContract;
        contract: import("../contract/entities/contract.entity").Contract;
    }>;
    findMyContracts(client: User): Promise<import("./entities/rental.entity").RentalContract[]>;
    findAll(filterDto: FilterRentalsDto): Promise<import("./entities/rental.entity").RentalContract[]>;
    updateStatus(id: string, updateDto: UpdateRentalStatusDto, user: User): Promise<import("./entities/rental.entity").RentalContract>;
    getActiveDeliveries(): Promise<import("./entities/rental.entity").RentalContract[]>;
    getMetrics(): Promise<{
        active: number;
        pending: number;
        revenue: number;
    }>;
}
