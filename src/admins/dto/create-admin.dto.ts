export class CreateAdminDto {
    full_name: string;
    email: string;
    role: 'super_admin' | 'moderator';
    password_hash: string;
    is_active: boolean;
}
