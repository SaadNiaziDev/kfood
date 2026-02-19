import { Resend } from "resend";

const DEFAULT_TO_EMAIL = "contact@kfood.pk";

function escapeHtml(text) {
	if (text == null || text === "") return "";
	const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
	return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

function buildEmailHtml(body) {
	const name = escapeHtml(body.get("name") ?? "");
	const company = escapeHtml(body.get("company") ?? "");
	const email = escapeHtml(body.get("email") ?? "");
	const phone = escapeHtml(body.get("phone") ?? "");
	const message = escapeHtml(body.get("message") ?? "").replace(/\n/g, "<br>");
	return `
		<p><strong>Full Name:</strong> ${name}</p>
		<p><strong>Company:</strong> ${company}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Phone:</strong> ${phone}</p>
		<p><strong>Message:</strong></p>
		<p>${message}</p>
	`.trim();
}

function jsonResponse(obj, status = 200) {
	return new Response(JSON.stringify(obj), {
		status,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}

export default {
	async fetch(request, env) {
		try {
			if (request.method === "OPTIONS") {
				return new Response(null, {
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "POST, OPTIONS",
						"Access-Control-Allow-Headers": "Content-Type",
						"Access-Control-Max-Age": "86400",
					},
				});
			}

			if (request.method !== "POST") {
				return jsonResponse({ error: "Method not allowed" }, 405);
			}

			const apiKey = env.RESEND_API_KEY;
			const fromEmail = env.FROM_EMAIL || "KFood <partner@kfood.pk>";
			const toEmail = env.TO_EMAIL || DEFAULT_TO_EMAIL;

			if (!apiKey) {
				return jsonResponse({ error: "RESEND_API_KEY is not set" }, 500);
			}

			let body;
			try {
				body = await request.formData();
			} catch {
				return jsonResponse({ error: "Invalid form data" }, 400);
			}

			const email = body.get("email")?.toString()?.trim();
			const name = body.get("name")?.toString()?.trim();
			if (!email || !name) {
				return jsonResponse({ error: "Name and email are required" }, 400);
			}

			const resend = new Resend(apiKey);
			const { data, error } = await resend.emails.send({
				from: fromEmail,
				to: [toEmail],
				replyTo: email,
				subject: `Partner inquiry from ${name}`,
				html: buildEmailHtml(body),
			});

			if (error) {
				return jsonResponse(
					{ error: "Failed to send email", details: error.message ?? String(error) },
					502
				);
			}

			return jsonResponse({
				success: true,
				message: "Thank you. We will get back to you soon.",
				id: data?.id,
			});
		} catch (err) {
			return jsonResponse(
				{ error: "Internal Server Error", details: err?.message ?? String(err) },
				500
			);
		}
	},
};
