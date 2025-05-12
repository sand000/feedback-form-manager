import React from "react";

function FeedbackList({ e }) {
  return (
    <div style={{ marginBottom: "15px", border: "1px solid black" }}>
      <h3>Name: {e.name}</h3>
      <p>Feedback: {e.feedback}</p>
      <p>Rating: {e.rating}</p>
    </div>
  );
}

export default FeedbackList;
