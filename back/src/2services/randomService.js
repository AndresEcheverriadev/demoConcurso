import * as dotenv from "dotenv";
dotenv.config();

async function randomNumber(limit, filter) {
  let url = `https://api.random.org/json-rpc/4/invoke`;

  let request = {
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
      apiKey: process.env.RANDOM_ORG_API_KEY,
      n: 1,
      min: 0,
      max: limit,
      replacement: true,
      base: 10,
      pregeneratedRandomization: null,
    },
    id: filter,
  };

  const randomized = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error en la solicitud JSON-RPC:", error);
    });

  return randomized;
}

export default randomNumber;
