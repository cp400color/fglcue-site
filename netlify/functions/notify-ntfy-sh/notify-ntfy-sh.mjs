export async function handler(event) {
  try {
    const incomingSecret = event.headers["x-webhook-secret"];

    if (incomingSecret !== process.env.NTFY_WEBHOOK_SECRET) {
      return {
        statusCode: 403,
        body: "Forbidden"
      };
    }

    const data = JSON.parse(event.body);

    const name = data.name || "N/A";
    const email = data.email || "N/A";
    const subject = data.data?.subject || "No subject";
    const messageText = data.data?.message || "";
    const ip = data.data?.ip || "Unknown";
    const ua = data.data?.user_agent || "Unknown";

    const message = `
You just received a message on your contact form.

---

**Name:** ${name}  
**E-mail:** ${email}  
**Subject:** ${subject}

${name} said:

${messageText}

---

IP: ${ip}  
UA: ${ua}
`;

    await fetch(process.env.NTFY_URL, {
      method: "POST",
      headers: {
        Title: "💬 Message on your contact form",
        "Content-Type": "text/markdown"
      },
      body: message
    });

    return {
      statusCode: 200,
      body: "OK"
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  }
}
