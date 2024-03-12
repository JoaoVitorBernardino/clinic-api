import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class UserEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    commission: Decimal | null;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;

    @ApiProperty()
    role_id: string;

    @ApiProperty({ default: false })
    is_deleted: boolean;
}
