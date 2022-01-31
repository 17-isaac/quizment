import { useLocation, useLoaderData,useNavigate} from "remix";
import { db } from "~/utils/db.server";
import styleForNav from "~/styles/nav.css";
import Css from '~/styles/quiz'
export function links() {
  return [{
    rel: "stylesheet", href: styleForNav,
    rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
    rel: "stylesheet", href: Css,
  }];
}


export async function loader({ params, request }) {
    const resultsTemp = params.results;
    const results = resultsTemp.split('+')
    const QuizHistory = await db.quizHistory.create({
        data: {
            quizid: results[0],
            studentid: "18",
            pointsearned: parseInt(results[1]),
            marksearned: parseInt(results[2])
        },
    })

    const StudentPt = await db.student.update({
        where: {
            studentID: 18,
        },
        data: {
            totalPts: { increment: parseInt(results[1]) },
        },
    });
    const temp = "wow"
    return temp
}


export default function results() {
    const location = useLocation();
    const results = location.state.doc;
  
    const data = useLoaderData();

    return (
      
        <div className="result-screen">
          <div>
        <NavigationTeacher onClick={handleClick} />
      </div>
      {displayStuff && 
      <div>
            <h1>Redeemed!</h1>
            <p>{data}</p>
            </div>
      }
        </div>
    )
}
export function CatchBoundary() {
    let caught = useCatch();
    let params = useParams();
    let navigate = useNavigate();
  let data
    switch (caught.status) {
     
      case 404: {
        return navigate('/studentQuiz')
      }
      default: {
        throw new Error(`Unhandled error: ${caught.status}`);
      }
    }
  }
export function ErrorBoundary({ error }) {
    console.error(error);
    return (
      <html>
        <head>
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        </head>
        <body>
       <div>
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_aiphuevx.json"  background="transparent"  speed="1"  
          style={{width: 500, height: 500,  'margin-left':'30%'}}  loop controls autoplay></lottie-player> 
       </div>
        </body>
      </html>
    );
  }