import { NextResponse, NextRequest } from "next/server";
import { sunoApi } from "@/lib/SunoApi";
import { corsHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const limit = await (await sunoApi).get_credits();
    return NextResponse.json(limit, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error fetching limit:', error);
    return NextResponse.json({ error: 'Internal server error. ' + error }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}