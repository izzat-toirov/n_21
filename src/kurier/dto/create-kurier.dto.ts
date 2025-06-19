export class CreateKurierDto {
    full_name: string;
    phone_number: string;
    vehicle_type: 'foot' | 'bike' | 'car' | 'motorcycle';
    vehicle_plate_number: string;
    is_active: boolean;
}
