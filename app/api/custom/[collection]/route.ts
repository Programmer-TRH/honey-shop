import { parseSearchParams } from "@/lib/query/parseSearchParams";
import { productSchema } from "@/lib/shcema/product-schema";
import { getData } from "@/services/data-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { collection: string } }
) {
  try {
    const { collection } = await params;
    const searchParams = req.nextUrl.searchParams;

    const query = parseSearchParams(searchParams, productSchema);
    const result = await getData(collection, query);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch data.",
        data: [],
        filters: {},
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      },
      { status: 500 }
    );
  }
}
