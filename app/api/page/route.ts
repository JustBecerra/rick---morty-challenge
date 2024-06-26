const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${searchParams.get(
      "number"
    )}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return Response.json(data);
};

export { GET };
