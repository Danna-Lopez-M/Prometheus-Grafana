import { Repository } from 'typeorm';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { Lab } from './entities/lab.entity';
import { RentalContract } from '../rentals/entities/rental.entity';
import { Contract } from '../contract/entities/contract.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
export declare class LabsService {
    private readonly labRepo;
    private readonly rentalRepo;
    private readonly contractRepo;
    private readonly equipmentRepo;
    constructor(labRepo: Repository<Lab>, rentalRepo: Repository<RentalContract>, contractRepo: Repository<Contract>, equipmentRepo: Repository<Equipment>);
    create(createLabDto: CreateLabDto): Promise<{
        message: string;
        lab: Lab;
    }>;
    findAll(): Promise<{
        message: string;
        labs: Lab[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        lab: Lab;
    }>;
    update(id: number, updateLabDto: UpdateLabDto): Promise<{
        message: string;
        lab: Lab;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    reportBrokenEquipment(userId: string, contractId: string, notes?: string): Promise<{
        message: string;
        lab: Lab;
    }>;
    markAsRepaired(labId: string): Promise<{
        message: string;
    }>;
}
