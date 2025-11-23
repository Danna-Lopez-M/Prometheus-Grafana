import { LabsService } from './labs.service';
import { User } from '../users/entities/user.entity';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
export declare class LabsController {
    private readonly labsService;
    constructor(labsService: LabsService);
    reportEquipment(contractId: string, user: User, notes: string): Promise<{
        message: string;
        lab: import("./entities/lab.entity").Lab;
    }>;
    markAsRepaired(labId: string): Promise<{
        message: string;
    }>;
    create(createLabDto: CreateLabDto): Promise<{
        message: string;
        lab: import("./entities/lab.entity").Lab;
    }>;
    findAll(): Promise<{
        message: string;
        labs: import("./entities/lab.entity").Lab[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        lab: import("./entities/lab.entity").Lab;
    }>;
    update(id: string, updateLabDto: UpdateLabDto): Promise<{
        message: string;
        lab: import("./entities/lab.entity").Lab;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
