import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// Handle DELETE requests
export async function DELETE(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
  
      if (!id) {
        return NextResponse.json(
          { message: "ID is required" },
          { status: 400 }
        );
      }
  
      // Delete related SellerUser records first
      await prisma.sellerUser.deleteMany({
        where: { internalChargeId: id },
      });
  
      // Delete the InternalCharge
      const deletedInternalCharge = await prisma.internalCharge.delete({
        where: { id },
      });
  
      return NextResponse.json({
        message: "InternalCharge deleted successfully",
        deletedInternalCharge,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "InternalCharge not found" },
          { status: 404 }
        );
      }
  
      console.error("Error deleting InternalCharge:", error);
      return NextResponse.json(
        { message: "Failed to delete InternalCharge", error: error.message },
        { status: 500 }
      );
    }
  }
