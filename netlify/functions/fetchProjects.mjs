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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP error", response.status, errorText);
      return {
        statusCode: response.status || 500,
        body: JSON.stringify({
          error: `Failed to fetch projects: ${response.status} ${errorText}`,
        }),
      };
    }

    const data = await response.json();

    // Check if the data is an array and if each item has the properties you expect
    if (
      Array.isArray(data) &&
      data.every((project) => project.display_name && project.image_url)
    ) {
      const projects = data.map((project) => ({
        displayName: project.display_name,
        imageUrl: project.image_url,
      }));
      return {
        statusCode: 200,
        body: JSON.stringify(projects),
      };
    } else {
      console.error(
        "Unexpected data format or missing project properties:",
        data
      );
      return {
        statusCode: 500,
        body: JSON.stringify({
          error:
            "Data is not in expected format or missing necessary project properties",
        }),
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
