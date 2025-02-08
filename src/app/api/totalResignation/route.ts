import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const resignations = await prisma.resignations.findMany({
            include: {
                userRequestResign: {
                    select: {
                        id: true,
                        nameEng: true,
                        employeeProfile: true,
                        employeeTitle: true,
                    },
                },
            },
        });
        return NextResponse.json(resignations);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch resignations' }, { status: 500 });
    }
}
