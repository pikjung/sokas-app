export default async function formSubmit(url: string, method: string, data: any) {
  const response = await fetch(url, {
    method: method,
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  const responseData = await response.json();
  return responseData;
} 