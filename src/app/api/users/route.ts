import { NextResponse } from "next/server";
 
export async function POST(
  request: Request,
) {
  const body = await request.json();

  const { emailAddress, topic } = body;

  // TODO: create new user in database
  return NextResponse.json({
    emailAddress,
    topic,
  });
}