// const SUPABASE_URL =
// const API_KEY =

const headers = {
  "Content-Type": "application/json",
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

async function fetchData() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();
  console.log(data);
}

fetchData();
