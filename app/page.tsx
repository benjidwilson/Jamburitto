import { sql } from "@vercel/postgres";
export default async function Page() {
  const pageSize = 10; // Number of records per page
  const pageNumber = 1; // Specific page number

  const offset = (pageNumber - 1) * pageSize;

  // Fetching records for the specific page number returning 10 records per page
  const { rows: images } =
    await sql`SELECT * FROM images LIMIT ${pageSize} OFFSET ${offset};`;

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            {image.title}
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
