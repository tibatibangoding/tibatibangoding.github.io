import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

const emailTo = import.meta.env.EMAIL;
const emailToPass = import.meta.env.PASS;
const host = import.meta.env.HOST;

export const post: APIRoute = async ({ request }) => {
  console.log("request", request);

  if (request.headers.get("Content-Type") === "application/json") {
    const formData = await request.json();
    const nama = formData.nama;
    const email = formData.email;
    const subject = formData.subject;
    const pesan = `${formData.pesan}
    ----------------------------------------------------------------------
    From: ${nama} • email: ${email}
    `;
    const html = `<div style="margin: 20px auto;font-family: Helvetica, Verdana, sans-serif">${pesan.replace(
      /[\r\n]/g,
      "<br>",
    )}</div>`;

    // sendmail
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailTo,
        pass: emailToPass,
      },
    });

    let mailDetails = {
      from: email,
      to: emailTo,
      subject: `${new URL(request.url).hostname}: ${subject}`,
      text: pesan,
      html,
    };

    let mailresult;
    try {
      mailresult = await mailTransporter.sendMail(mailDetails);
    } catch (error) {
      console.log("******* Error: ", error);
    }
    console.log("Message sent: %s", mailresult?.messageId);

    // return endpoint response
    return new Response(JSON.stringify(mailDetails), {
      status: 200,
    });
  }
  return new Response(null, { status: 400 }); // if not a json request
};
