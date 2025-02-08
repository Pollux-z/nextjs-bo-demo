import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    try {
        const resignation = await prisma.resignations.delete({
            where: { id },
        });

        return NextResponse.json(resignation, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
