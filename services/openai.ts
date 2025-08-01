const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn(
    "OpenAI API Key not found. Please ensure EXPO_PUBLIC_OPENAI_API_KEY is set in your environment variables (.env file)."
  );
}

interface IngredientResponse {
  ingredients: string[];
  description?: string;
}

export async function extractIngredients(
  base64Image: string
): Promise<IngredientResponse> {
  const dataUri = `data:image/jpeg;base64,${base64Image}`;

  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that extracts raw ingredients from a food photo and returns them as a JSON object. The object should have a key 'ingredients' with a value of a JSON array of strings. For example: {\"ingredients\": [\"onion\", \"garlic\", \"chicken\", \"carrot\", \"potato\"]}. If you cannot find any ingredients, return an empty array for 'ingredients' along with a concise 'description' key explaining what you see in the image. For example: {\"ingredients\": [], \"description\": \"A picture of a cat\"}. Ensure the entire response is a single valid JSON object. Ensure you do not use any punctuation in the response. Do not respond with duplicate ingredients.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "List all ingredients visible in this image." },
          { type: "image_url", image_url: { url: dataUri } }
        ]
      }
    ],
    response_format: { type: "json_object" }
  };

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const json = await response.json();
  const content = json.choices[0].message.content;

  try {
    const result: IngredientResponse = JSON.parse(content);

    if (
      typeof result === "object" &&
      result !== null &&
      Array.isArray(result.ingredients)
    ) {
      if (
        result.ingredients.every((item) => typeof item === "string") &&
        (result.description === undefined || typeof result.description === "string")
      ) {
        return result;
      }
    }
    throw new Error(
      "Invalid response format: Expected {ingredients: string[], description?: string}."
    );
  } catch (error) {
    console.error("Failed to parse ingredients from OpenAI response:", error);
    console.error("Raw content:", content);
    throw new Error("Failed to parse ingredients from OpenAI response.");
  }
}
