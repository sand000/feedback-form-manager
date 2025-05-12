import { useMemo, useRef, useState, useEffect } from "react";
import FeedbackList from "./FeedbackList";
import Search from "./Search";

function Form() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const ratingRef = useRef(null);

  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rating = ratingRef.current.value;

    if (!name || !feedback || !rating) {
      alert("Please fill all the required details");
      return;
    }

    setData({
      name,
      feedback,
      rating,
    });
    console.log(feedback);
    setName("");
    setFeedback("");
    ratingRef.current.value = "";
  };

  useEffect(() => {
    console.log(feedback);
    if (data) {
      setFeedbackList((prev) => [...prev, data]);
    }

    return () => {
      console.log(`Cleaning up the feedback componnet.`);
    };
  }, [data]);

  const filteredFeedback = useMemo(() => {
    return feedbackList.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, feedbackList]);

  const handleClear = () => {
    setData(null);
    setFeedbackList([]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h2>Feedback Form</h2>
        <button
          onClick={handleClear}
          style={{
            color: "white",
            backgroundColor: "red",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          CLear Feedbacks
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <input
            style={{ height: "30px" }}
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Name'
          />
          <textarea
            placeholder='Enter feedback here'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows='4'
            cols='50'
          />
          <input placeholder='Rate between 1 to 5' max='5' min='1' type='number' ref={ratingRef} />
          <button type='submit' style={{ color: "white", backgroundColor: "green" }}>
            Submit
          </button>
        </div>
      </form>

      <div style={{ marginTop: "30px" }}>
        <Search search={search} setSearch={setSearch} />

        <h2>Feedback List</h2>

        {filteredFeedback.length > 1 ? (
          <h3 style={{ color: "red" }}>Too many results, please refine your search</h3>
        ) : filteredFeedback.length > 0 ? (
          filteredFeedback.map((e, i) => (
            <div key={i}>
              {" "}
              <FeedbackList e={e} filteredFeedback={filteredFeedback} />
            </div>
          ))
        ) : (
          <p>No Feedback Yet</p>
        )}
      </div>
    </div>
  );
}

export default Form;
