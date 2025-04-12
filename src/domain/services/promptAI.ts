export async function sendPrompt(prompt: any) {
	try {
		const response = await fetch(`http://localhost:11434/api/generate`, {
			method: "POST",
			headers: { "Content-Type": "text/plain" },
			body: JSON.stringify({ model: "deepseek-r1:14b", prompt, stream: false }),
		});

		const data = await response.json();
		console.log(data["response"]);

		if (!response.ok) {
			console.error("Error sending prompt:", response.status);
		}

		return await response.json();
	} catch (error) {
		console.error("Error sending prompt:", error);
	}
}
