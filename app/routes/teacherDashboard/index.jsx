import { redirect } from "remix";
import { db } from "~/utils/db.server";
import { auth } from '~/utils/firebase';
import { signOut } from "firebase/auth";
import Button from '@mui/material/Button';


export async function loader() {
  const data = {
    studentDetailsData: await db.student.findUnique({
      where: {
        studentID: 22,
      },
      select: {
        name: true,
        Uid: true,
        streaks: true
      }
    })
  };
  return data;
};

const logout = async () => {
  await signOut(auth);
  redirect('/');
};

export default function TeacherDashboardContent() {
  return (
    <div>
      <Button
        onClick={logout}
        fullWidth
        variant="contained"
        sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', mt: 3, mb: 2 }}
      >Sign Out
      </Button>
    </div>
  );
}