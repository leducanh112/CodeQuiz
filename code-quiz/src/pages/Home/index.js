import { useNavigate } from "react-router-dom";

import "./Home.scss";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section data-aos="fade-down" className="hero">
        <div className="container">
          <h1>Challenge Yourself with Code Quiz</h1>
          <p>Test your skills in JavaScript, Python, React, and more!</p>
          <button className="btn" onClick={() => navigate("/topic")}>
            Start Quiz
          </button>
        </div>
      </section>

      <section data-aos="zoom-in" className="features">
        <div className="container">
          <div className="feature-item">
            <i className="bx bx-code-alt"></i>
            <h3>Variety of Topics</h3>
            <p>Quizzes for all levels, from beginner to expert.</p>
          </div>
          <div className="feature-item">
            <i className="bx bx-trophy"></i>
            <h3>Compete & Rank</h3>
            <p>Challenge your friends and climb the leaderboard.</p>
          </div>
          <div className="feature-item">
            <i className="bx bx-stopwatch"></i>
            <h3>Time-Based Challenges</h3>
            <p>Improve your speed with time-limited quizzes.</p>
          </div>
        </div>
      </section>

      <section data-aos="fade-up" className="cta">
        <div className="container">
          <h2>Join Now and Test Your Knowledge</h2>
          <button className="btn outline" onClick={() => navigate("/login")}>
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
