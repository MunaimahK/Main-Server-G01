import "./LoginStars.css";
import { Route, Routes, Redirect } from "react-router-dom";
function redirect() {
  console.log("Hello");
}
const Login = () => {
  return (
    <body id="star-theme">
      <div className="front-page">
        <div className="container">
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
        </div>
      </div>
      <div className="start">
        <h1>Influx</h1>
        <div>
          <a href="https://discord.com/api/oauth2/authorize?client_id=1206671973191516211&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fdashboard&scope=identify+email">
            Start Now
          </a>
        </div>
      </div>
    </body>
  );
};

export default Login;
