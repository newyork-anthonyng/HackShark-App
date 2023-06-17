import { NextResponse } from "next/server";
import sendEmail from "./sendEmail";
 
export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const emailAddress = 'newyork.anthonyng@gmail.com';
  const subject = "Hello with variable";
  const text = "Testing some Mailgun awesomeness!";
  const html = "<h1>Testing some Mailgun awesomeness!</h1>";
  await sendEmail(emailAddress, { text, html, subject });
  
  return NextResponse.json({
    body: 'hello world',
    id,
  });
}