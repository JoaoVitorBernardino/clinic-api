import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({ example: 'emily.wilson@example.com' })
    email: string;

    @ApiProperty({ example: 'ew@9999' })
    password: string;
}