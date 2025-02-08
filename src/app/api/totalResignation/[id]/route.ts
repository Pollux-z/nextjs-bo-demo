import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const resignation = await prisma.resignations.findUnique({
            where: { id },
        });

        if (!resignation) {
            return NextResponse.json({ error: 'Resignation not found' }, { status: 404 });
        }

        return NextResponse.json(resignation);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
    const { userRequest, effectiveDate, note, status, userCreate } = body;

    try {
        const updatedResignation = await prisma.resignations.update({
            where: { id },
            data : {
                userRequest,
                effectiveDate: new Date(effectiveDate),
                note,
                status,
                userCreate,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(updatedResignation);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.resignations.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Resignation deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}