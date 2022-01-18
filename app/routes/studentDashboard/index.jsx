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

export default function StudentDashboardContent() {
    const data = useLoaderData();
    return (
      <div>
        <p>Name: {data.studentDetailsData.name}</p>
        <p>Uid: {data.studentDetailsData.Uid}</p>
        <p>Streaks: {data.studentDetailsData.streaks}</p>
      </div>
    );
}