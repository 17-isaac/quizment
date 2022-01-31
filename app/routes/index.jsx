import { useLoaderData, Link } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to quizment</h1>    
      <h2><Link to="auth">Log In</Link></h2>
    </div>
  );
}
