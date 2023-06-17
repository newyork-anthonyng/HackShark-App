import { NextResponse } from "next/server";
 
// TODO: this is a placeholder for a real cron job
export function GET(
  request: Request,
) {
  console.log('cron job running', new Date());

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  return NextResponse.json({
    body: 'hello world',
    id,
  });
}