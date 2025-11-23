import { RentalContract } from '../../rentals/entities/rental.entity';
import { User } from '../../users/entities/user.entity';
export declare class Delivery {
    id: String;
    rental: RentalContract;
    technician: User;
    client: User;
    actDocumentUrl?: string;
    clientSignatureUrl?: string;
    visualObservations?: string;
    technicalObservations?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'in-review';
    createdAt: Date;
}
