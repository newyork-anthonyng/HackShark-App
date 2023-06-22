import { NextResponse } from "next/server";
import sendEmail from "./sendEmail";
 
const BASE_URL = 'http://localhost:8000'
export async function GET(
) {
  const emailsToSend = await fetch(`${BASE_URL}/users/weeklyemails`).then(res => res.json());

  for (let i = 0; i < emailsToSend.length; i++) {
    const currentEmailToSend = emailsToSend[i];

    const emailAddress = currentEmailToSend.email;
    const researchPaper = currentEmailToSend.researchPaper;
    const subject = `This week's article is: ${researchPaper.title}`;
    const html = `
      <h1>HackShark</h1>
      <p>This week's article is: ${researchPaper.title}</p>
      <p>${researchPaper.abstract}</p>
      <a href="${researchPaper.url}">View full article here</a>
    `;
    const text = `
    HackShark

    This week's article is: ${researchPaper.title}

    ${researchPaper.abstract}

    ${researchPaper.url}
    `;
    await sendEmail(emailAddress, { text, html, subject });
  }
  
  return NextResponse.json({
    ok: true,
  });
}