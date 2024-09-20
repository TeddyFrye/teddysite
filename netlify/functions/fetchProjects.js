// netlify/functions/fetchProjects.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
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

    return {
      statusCode: 200,
      body: JSON.stringify(data.map((project) => project.display_name)),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch projects" }),
    };
  }
};
