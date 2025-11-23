import { User } from '../../users/entities/user.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';
export declare class RentalContract {
    id: string;
    client: User;
    technical: User;
    equipment: Equipment;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    isDisabled: boolean;
    createdAt: Date;
    approvedBy?: string;
    approvalDate?: Date;
    isDelivered: boolean;
    deliveryNotes?: string;
}
