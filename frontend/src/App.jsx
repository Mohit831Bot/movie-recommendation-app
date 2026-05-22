import { useState } from "react";
import axios from "axios";
import { MdMovieFilter } from "react-icons/md";

function App() {

  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://movie-recommendation-app-c3wv.onrender.com/api/recommendations",
        {
          prompt
        }
      );

      setMovies(response.data.recommendations);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };
return (

  <div
    style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "Arial"
    }}
  >

    {/* Loading Overlay */}
    {loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          color: "white",
          fontSize: "30px",
          fontWeight: "bold"
        }}
      >
        Loading...
      </div>
    )}

    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        background: "#1e293b",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
      }}
    >

      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "36px"
        }}
      >
        🎬 Movie Recommendation App
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >

        <input
          type="text"
          placeholder="Enter movie preference..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            background: "#334155",
            color: "white"
          }}
        />

        <button
          onClick={getRecommendations}
          style={{
            padding: "15px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Search
        </button>

      </div>

      <div style={{ marginTop: "30px" }}>

        <h2
          style={{
            color: "white",
            marginBottom: "20px"
          }}
        >
          Recommended Movies
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px"
          }}
        >

          {movies.map((movie, index) => (

            <div
              key={index}
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
                color: "white",
                fontSize: "18px"
              }}
            >
              🎥 {movie}
            </div>

          ))}

        </div>

      </div>

    </div>

  </div>
);
}

export default App;