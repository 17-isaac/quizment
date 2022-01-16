import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export async function loader() {
    const data = {
      studentDetailsData: await db.student.findUnique({
        where: {
          studentID: 16,
        },
        select: {
          name: true,
          Uid: true,
          streaks: true
        }
      })
    };
    // db.$disconnect();
    return data;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
       <p>Name: {data.studentDetailsData.name}</p>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
