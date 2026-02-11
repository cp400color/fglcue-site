// this function just sends a notification to ntfy for contact forms. you can ignore this
export async function handler(event) {
    const data = JSON.parse(event.body);

    const name = data.data.name || "N/A";
    const email = data.data.email || "N/A";
    const subject = data.data.subject || "No subject";
    const messageText = data.data.message || "<literally nothing was sent>";
    const ip = data.data.ip || "Unknown";
    const ua = data.data.user_agent || "Unknown";

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

---

ASAP is poison.
`;

    await fetch(process.env.NTFY_URL, {
        method: "POST",
        headers: {
            Title: "💬 Message on your contact form",
            "Content-Type": "text/markdown",
        },
        body: message,
    });

    return {
        statusCode: 200,
        body: "OK",
    };
}
