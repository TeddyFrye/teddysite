import fetch from "node-fetch";

export async function handler(event, context) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const API_KEY = process.env.SUPABASE_KEY;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      const projectNames = data.map((project) => project.display_name);
      return {
        statusCode: 200,
        body: JSON.stringify(projectNames),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Data is not in expected format" }),
      };
    }
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch projects" }),
    };
  }
}
