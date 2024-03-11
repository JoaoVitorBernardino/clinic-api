import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class ServiceEntinty {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ default: 0 })
    price: Decimal;

    @ApiProperty({ default: 0 })
    estimated_time: Number;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;

    @ApiProperty({ default: false })
    is_deleted: boolean;
}
