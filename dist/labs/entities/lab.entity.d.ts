import { Equipment } from '../../equipments/entities/equipment.entity';
import { User } from '../../users/entities/user.entity';
export declare class Lab {
    id: string;
    equipment: Equipment;
    reportedBy: User;
    reportedAt: Date;
    notes: string;
    isRepaired: boolean;
}
