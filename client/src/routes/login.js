import fetch from "node-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await fetch(`http://localhost:5001/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    const parsed = await result.json();

    if (typeof parsed.error !== "undefined") {
      throw new Error(parsed.error);
    }

    req.session.token = parsed.token;
    req.session.user = parsed.user;
    res.end(JSON.stringify({
      token: parsed.token,
      user: parsed.user
    }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
