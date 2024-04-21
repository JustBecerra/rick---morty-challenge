import { NextApiRequest, NextApiResponse } from "next";

const GET = async (page: number) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return Response.json(data);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query; // Assuming you're passing the page number as a query parameter
  if (typeof page !== "string") {
    res.status(400).json({ error: "Invalid page number" });
    return;
  }
  try {
    const pageNumber = parseInt(page, 10);
    const data = await GET(pageNumber);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
export { GET };
