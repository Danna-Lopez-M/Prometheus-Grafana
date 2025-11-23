import { RentalContract } from "../../rentals/entities/rental.entity";
import { User } from "../../users/entities/user.entity";
export declare class Contract {
    contract_id: string;
    contract_number: string;
    start_date: Date;
    end_date: Date;
    monthly_value: number;
    user: User;
    rental?: RentalContract;
}
