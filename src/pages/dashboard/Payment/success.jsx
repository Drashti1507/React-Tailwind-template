import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase.</p>

      <Link to="/">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
}
