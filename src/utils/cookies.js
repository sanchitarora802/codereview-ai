"use client";

export const checkUserExistence = async (userEmail) => {
  console.log(`[API MOCK] Checking existence for: ${userEmail}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock logic: user exists if email includes 'existing'
  const exists = userEmail.includes("existing");
  return { exists };
};
