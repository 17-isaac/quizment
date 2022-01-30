export default function QuizResult({ result, retry, setResults }) {

  function bringToResults() {
    setResults(result);
  }

  return (
    <div className="result-screen">
      <h2>Result: {result.percentage}%</h2>
      <p>Selected {result.correct} correct options of {result.total} questions</p>
      <p>you earned {result.pointsEarned} Points!</p>
      <button onClick={retry}>Retry</button>
      <button type="submit" name="_action" value="post" onClick={bringToResults}>Click here to Redeem POINTSSS</button>
    </div>
  )
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
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_aiphuevx.json" background="transparent" speed="1"
            style={{ width: 600, height: 600, 'margin-left': '25%' }} loop controls autoplay></lottie-player>
        </div>
      </body>
    </html>
  );
}