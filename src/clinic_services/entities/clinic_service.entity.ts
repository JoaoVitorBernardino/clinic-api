import { ApiProperty } from "@nestjs/swagger";

export class ClinicServiceEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    clinic_id: string;

    @ApiProperty()
    service_id: string;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;

    @ApiProperty({ default: false })
    is_deleted: boolean;
}
