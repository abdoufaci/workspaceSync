export const profanityCheck = async ({ message }: { message?: string }) => {
  const res = await fetch("https://vector.profanity.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = res.json();

  return data;
};
