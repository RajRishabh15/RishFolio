module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    return res.status(500).json({ error: 'API key is missing on the server.' });
  }

  const systemPrompt = `You are RBOT, the AI assistant for Rishabh Raj's portfolio website. 
Rishabh is a Student Developer and Digital Dreamer who crafts thoughtful digital experiences where beautiful design meets clean code.
Answer visitor questions politely, concisely, and professionally. Use markdown for bold text and line breaks. Keep answers brief (1-3 short sentences).

Here is some context about Rishabh:
- About: A developer exploring the intersection of creativity and technology.
- Projects: 
  1. France & Tech (React, Node.js, Tailwind, Vite)
  2. Chandrayaan Mission Web (HTML, JS, Tailwind)
  3. To-Do List App (Python CLI)
  4. Subscription Manager (Upcoming - React, Node, MongoDB)
  5. Tech Event Web (HTML, CSS, JS)
  6. TechFest 3D (Three.js, GSAP, HTML, CSS)
- Skills: Full Stack Development, Web Dev, UI/UX, Python, JavaScript, React, Node.js.
- Contact: User can reach out via the Contact page form or social links.

If the user asks something outside this context, politely let them know you are specifically here to answer questions about Rishabh and his work.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(500).json({ error: 'Failed to generate response', details: errText });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
