import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { SENDGRID_API_KEY } from "$env/static/private";
import sgMail from "@sendgrid/mail";

console.log(SENDGRID_API_KEY)
sgMail.setApiKey(SENDGRID_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return json({ message: "All fields are required" }, { status: 400 });
  }

  const mailMessage = {
    to: "echoedinvoker@gmail.com",
    from: "mattchang@mirle.com.tw",
    subject: "Message from dev-portfolio contact form",
    html: `Someone sent you a message from your portfolio website:<br><br>
    <strong>Name:</strong> ${name}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Message:</strong> ${message}`,
  };

  try {
    await sgMail.send(mailMessage);
    return json({ emailSentSuccessfully: true });
  } catch (err) {
    return json({ err }, { status: 500 });
  }
}
