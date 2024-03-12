import { ApiProperty } from "@nestjs/swagger";

export class CustomerServiceEntity {
    @ApiProperty()
    id: string;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    started_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    fineshed_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;

    @ApiProperty()
    is_deleted: boolean;

    @ApiProperty()
    client_id: string;

    @ApiProperty()
    professional_id: string;
}
