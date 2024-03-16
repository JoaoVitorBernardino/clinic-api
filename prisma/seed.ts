import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

function generateStartedAt(): Date {
    const currentDate: Date = new Date();

    const randomHours: number = Math.floor(Math.random() * 24);
    const randomMinutes: number = Math.floor(Math.random() * 60);

    const startedAt: Date = new Date(currentDate.getTime() - (randomHours * 60 * 60 * 1000) - (randomMinutes * 60 * 1000));

    return startedAt;
}

function generateFinishedAt(startedAt: Date, durationInMinutes: number): Date {
    const finishedAt: Date = new Date(startedAt.getTime() + (durationInMinutes * 60 * 1000));

    return finishedAt;
}

async function main() {
    const rolesData = {
        '665758b5-e9b8-4285-942d-9cbc8817722d': {
            name: 'client',
        },
        '4a2f9fce-0e1f-47bc-8196-f99225d1106d': {
            name: 'professional',
        }
    };

    const roles = await prisma.$transaction(
        Object.entries(rolesData).map(([id, data]) =>
            prisma.roles.upsert({
                where: { id },
                update: {},
                create: { id, ...data },
            }),
        ),
    );

    const clinicsData = {
        '84685e4e-9a5c-4844-b192-598eaa124e44': {
            name: 'Clínica Médica Vitalis',
        },
        '95779b87-7eb2-4967-8d79-4295389f1f51': {
            name: 'Centro de Saúde Harmonia',
        },
        '92c22baa-728f-4e71-99c5-faf764097e74': {
            name: 'Clínica Integrada Bem-Estar',
        },
        '00b5849e-6c0f-44e4-9343-f19c5184512b': {
            name: 'Centro Médico Renovação Vital',
        },
    };

    const clinics = await prisma.$transaction(
        Object.entries(clinicsData).map(([id, data]) =>
            prisma.clinics.upsert({
                where: { id },
                update: {},
                create: { id, ...data },
            }),
        ),
    );

    const servicesData = {
        '576547a3-e75f-444a-b1a5-8d275f0477d5': {
            name: 'Consulta de Pediatria',
            category: 'Serviços Médicos',
            price: 150,
            estimated_time: 30,
        },
        'dbcfd9c2-c372-4b5c-ba8a-0ad0b26c52c0': {
            name: 'Consulta de Ginecologia',
            category: 'Serviços Médicos',
            price: 200,
            estimated_time: 45,
        },
        'a91e8ccd-6ec6-471d-ab2c-2d4317215d1f': {
            name: 'Consulta de Obstetrícia',
            category: 'Serviços Médicos',
            price: 200,
            estimated_time: 45,
        },
        '502e2503-2ac4-45b5-bf5f-022622f0c77a': {
            name: 'Consulta de Cardiologia',
            category: 'Serviços Médicos',
            price: 250,
            estimated_time: 40,
        },
        'f5683bb8-4cb4-413e-a07d-51be5a48b458': {
            name: 'Consulta de Dermatologia',
            category: 'Serviços Médicos',
            price: 180,
            estimated_time: 35,
        },
        '153a12f4-de7e-43b4-a2c2-5f7184af5227': {
            name: 'Testes de Alergia',
            category: 'Serviços de Diagnóstico',
            price: 300,
            estimated_time: 60,
        },
        'ba53be40-76b2-404a-af7f-1bdee3e98863': {
            name: 'Testes de Função Pulmonar',
            category: 'Serviços de Diagnóstico',
            price: 180,
            estimated_time: 45,
        },
        'e4c422ba-9142-41a1-bfdb-2e3c51e981cc': {
            name: 'Testes de Função Hepática',
            category: 'Serviços de Diagnóstico',
            price: 250,
            estimated_time: 60,
        },
        'e4b1ca5d-6097-4da8-b57b-23bebc3c0496': {
            name: 'Testes de Glicemia',
            category: 'Serviços de Diagnóstico',
            price: 50,
            estimated_time: 15,
        },
        'ed24ec26-43a8-4605-8b7a-7ecd10df1aec': {
            name: 'Terapia Ocupacional',
            category: 'Reabilitação e Terapia',
            price: 120,
            estimated_time: 50,
        },
        'b34a721b-735c-4e78-a45d-7afd9669a371': {
            name: 'Terapia da Fala',
            category: 'Reabilitação e Terapia',
            price: 150,
            estimated_time: 45,
        },
        '81568396-7b8d-4fe3-9b8d-58833a5bd130': {
            name: 'Terapia Comportamental',
            category: 'Reabilitação e Terapia',
            price: 180,
            estimated_time: 60,
        },
        '0a2e3c25-1efa-497e-8f3d-d7cabdfeedbe': {
            name: 'Reabilitação Neurológica',
            category: 'Reabilitação e Terapia',
            price: 200,
            estimated_time: 60,
        },
    };

    const services = await prisma.$transaction(
        Object.entries(servicesData).map(([id, data]) =>
            prisma.services.upsert({
                where: { id },
                update: {},
                create: { id, ...data }
            }),
        ),
    );


    const usersData = {
        'ef8ec9ac-01dc-4a54-9432-70a4a23eb342': {
            username: 'John Doe',
            email: 'john.doe@example.com',
            password: 'jd@1234',
            role_id: '665758b5-e9b8-4285-942d-9cbc8817722d',
        },
        '0bc1b715-d859-4fd0-8b47-f79bd852e6a5': {
            username: 'Sarah Smith',
            email: 'sarah.smith@example.com',
            password: 'ss@5678',
            role_id: '665758b5-e9b8-4285-942d-9cbc8817722d',
        },
        '3e0247d6-f82b-43ce-abc0-646b94c01b01': {
            username: 'Luisa Rodrigues',
            email: ' luisa.rodrigues@example.com',
            password: 'lr@12345',
            role_id: '665758b5-e9b8-4285-942d-9cbc8817722d',
        },
        '4c466b11-b74f-4726-826b-ae773a5bafc4': {
            username: 'Anderson Silva',
            email: 'anderson.silva@example.com',
            password: 'as@abc123',
            role_id: '665758b5-e9b8-4285-942d-9cbc8817722d',
        },
        '224b8527-0251-4612-acdc-182d3be37fc3': {
            username: 'Mike Jones',
            email: 'mike.jones@example.com',
            password: 'mj@abcd',
            commission: 0.1,
            role_id: '4a2f9fce-0e1f-47bc-8196-f99225d1106d',
        },
        '066df5ef-7b46-4c21-9c8b-da45eb12951c': {
            username: 'Emily Wilson',
            email: 'emily.wilson@example.com',
            password: 'ew@9999',
            commission: 0.2,
            role_id: '4a2f9fce-0e1f-47bc-8196-f99225d1106d',
        },
    };

    const users = await prisma.$transaction(
        Object.entries(usersData).map(([id, data]) => {
            data.password = hashSync(data.password, 10);
            return prisma.users.upsert({
                where: { id },
                update: {},
                create: { id, ...data }
            })
        })
    );

    const clinicServicesData = {
        'ddbc3e78-c33b-477b-940e-529dd9fe5922': {
            clinic_id: '84685e4e-9a5c-4844-b192-598eaa124e44',
            service_id: '576547a3-e75f-444a-b1a5-8d275f0477d5',
        },
        'fee7fe74-8fb2-4c00-b4fc-98afd9a0c2c4': {
            clinic_id: '84685e4e-9a5c-4844-b192-598eaa124e44',
            service_id: 'dbcfd9c2-c372-4b5c-ba8a-0ad0b26c52c0',
        },
        'c9ca16d3-3e5b-4c63-a277-967ddea2a07a': {
            clinic_id: '84685e4e-9a5c-4844-b192-598eaa124e44',
            service_id: 'a91e8ccd-6ec6-471d-ab2c-2d4317215d1f',
        },
        '84e574d5-2435-4b7b-a99b-c4909e5f7a54': {
            clinic_id: '95779b87-7eb2-4967-8d79-4295389f1f51',
            service_id: '502e2503-2ac4-45b5-bf5f-022622f0c77a',
        },
        '143b3d2d-1d1e-48a5-9dbf-9f707c24742d': {
            clinic_id: '95779b87-7eb2-4967-8d79-4295389f1f51',
            service_id: 'f5683bb8-4cb4-413e-a07d-51be5a48b458',
        },
        'd9b3c960-69b9-4b37-94a1-6f89dc12b0cc': {
            clinic_id: '95779b87-7eb2-4967-8d79-4295389f1f51',
            service_id: '153a12f4-de7e-43b4-a2c2-5f7184af5227',
        },
        '1270c931-de8f-42c6-8308-4daaa13154c5': {
            clinic_id: '92c22baa-728f-4e71-99c5-faf764097e74',
            service_id: 'ba53be40-76b2-404a-af7f-1bdee3e98863',
        },
        '6e548579-84f0-4b1c-a0a7-98b6baec3e16': {
            clinic_id: '92c22baa-728f-4e71-99c5-faf764097e74',
            service_id: 'e4c422ba-9142-41a1-bfdb-2e3c51e981cc',
        },
        '5b98537d-3f8b-4bde-accf-00bc29621faa': {
            clinic_id: '92c22baa-728f-4e71-99c5-faf764097e74',
            service_id: 'e4b1ca5d-6097-4da8-b57b-23bebc3c0496',
        },
        '41538c7a-f361-4424-a0d2-a8a6107a0a89': {
            clinic_id: '00b5849e-6c0f-44e4-9343-f19c5184512b',
            service_id: 'ed24ec26-43a8-4605-8b7a-7ecd10df1aec',
        },
        '43b36324-64d3-4e3b-a0e2-1e34a5e281d5': {
            clinic_id: '00b5849e-6c0f-44e4-9343-f19c5184512b',
            service_id: 'b34a721b-735c-4e78-a45d-7afd9669a371',
        },
        '9c8b6f5d-0058-493d-8606-fc9146f78b15': {
            clinic_id: '00b5849e-6c0f-44e4-9343-f19c5184512b',
            service_id: '81568396-7b8d-4fe3-9b8d-58833a5bd130',
        },
        '68141982-08da-45c5-81b3-6c3447b44581': {
            clinic_id: '00b5849e-6c0f-44e4-9343-f19c5184512b',
            service_id: '0a2e3c25-1efa-497e-8f3d-d7cabdfeedbe',
        },
    };

    const clinicServices = await prisma.$transaction(
        Object.entries(clinicServicesData).map(([id, data]) =>
            prisma.clinic_services.upsert({
                where: { id },
                update: {},
                create: { id, ...data }
            }),
        ),
    );

    const startedAt1 = generateStartedAt();
    const startedAt2 = generateStartedAt();
    const finishedAt1 = generateFinishedAt(startedAt1, services[0].estimated_time);
    const finishedAt2 = generateFinishedAt(startedAt2, services[5].estimated_time);

    const customerServicesData = {
        '7c3c79f5-df04-4e1b-843e-1c7ac90dcd58': {
            started_at: startedAt1,
            finished_at: finishedAt1,
            client_id: 'ef8ec9ac-01dc-4a54-9432-70a4a23eb342',
            professional_id: '224b8527-0251-4612-acdc-182d3be37fc3',
        },
        '5c23cb3c-00e8-4974-89f3-2a1d0e0fc6ef': {
            started_at: startedAt2,
            finished_at: finishedAt2,
            client_id: '0bc1b715-d859-4fd0-8b47-f79bd852e6a5',
            professional_id: '066df5ef-7b46-4c21-9c8b-da45eb12951c',
        },
    };

    const customerServices = await prisma.$transaction(
        Object.entries(customerServicesData).map(([id, data]) =>
            prisma.customer_services.upsert({
                where: { id },
                update: {},
                create: { id, ...data }
            }),
        ),
    );


    const selectedServicesData = {
        '6f0f5761-9981-4576-b4c0-0057edddb756': {
            clinic_service_id: clinicServices[0].id,
            customer_service_id: customerServices[0].id,
        },
        '4e7db395-6cc3-4a73-9c28-226d5871f1de': {
            clinic_service_id: clinicServices[5].id,
            customer_service_id: customerServices[1].id,
        },
    };

    const selectedServices = await prisma.$transaction(
        Object.entries(selectedServicesData).map(([id, data]) =>
            prisma.selected_services.upsert({
                where: { id },
                update: {},
                create: { id, ...data }
            }))
    )

    console.log(roles);
    console.log(users);
    console.log(clinics);
    console.log(services);
    console.log(clinicServices);
    console.log(customerServices);
    console.log(selectedServices);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})