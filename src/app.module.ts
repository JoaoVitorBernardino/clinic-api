import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ClinicServicesModule } from './clinic_services/clinic_services.module';
import { ClinicsModule } from './clinics/clinics.module';
import { CustomerServicesModule } from './customer_services/customer_services.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './roles/roles.guard';
import { RolesModule } from './roles/roles.module';
import { SelectedServicesModule } from './selected_services/selected_services.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        PrismaModule,
        RolesModule,
        UsersModule,
        CustomerServicesModule,
        ClinicsModule,
        ServicesModule,
        ClinicServicesModule,
        SelectedServicesModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
    ]
})
export class AppModule { }
