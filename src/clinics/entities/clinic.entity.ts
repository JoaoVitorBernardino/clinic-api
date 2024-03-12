import { ApiProperty } from "@nestjs/swagger";

export class ClinicEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ default: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;

    @ApiProperty({ default: false })
    is_delete: boolean;
}
