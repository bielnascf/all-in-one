import { Resend } from "resend";
import { NextResponse } from "next/server";
import { feedbackSchema } from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  const result = feedbackSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, role, suggestion } = result.data;

  try {
    const data = await resend.emails.send({
      from: "Form AIO <onboarding@resend.dev>",
      to: ["allinone.dev.app@gmail.com"],
      subject: `Feedback from ${name} - ${role}`,
      html: `
    <h2>Ticket AIO</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Role:</strong> ${role}</p>
    <p><strong>Suggestion:</strong></p>
    <p>${suggestion}</p>
   `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
