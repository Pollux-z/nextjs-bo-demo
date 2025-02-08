import {NextResponse} from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import Project from '../../../../models/project'

export const dynamic = "force-dynamic"
export async function GET(req){
    await connectMongoDB();
    const totalProject = await Project.find().sort({projectCode: - 1});
    return NextResponse.json({totalProject})
}