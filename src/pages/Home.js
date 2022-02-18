import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";
import { Carousel, Card } from 'antd';
import Carousel1 from "../images/carousel1.png";
import Carousel2 from "../images/carousel2.png";
import Carousel3 from "../images/carousel3.png";
import Comics from "../images/comics.png";
import ArtemisFowl from "../images/ArtemisFowl.png";
import MobyDick from "../images/MobyDick.png";
import Adventure from "../images/adventure.png";
import Dictionaries from "../images/dictionaries.png";
import Fantasy from "../images/fantasy.png";
import Horror from "../images/horror.png";

const carousel = [Carousel1,Carousel2,Carousel3];
const catCard = [Adventure, Fantasy,Horror,Dictionaries];
const Home = () => {

return(
  <>
  <div className="container">
    <Header/>
    <Carousel autoplay className="carousel">
    {carousel.map((e) => {
        return <img src={e} className="carousel-img" alt="carousel"></img>;
    })}
    </Carousel>
    <div className="cards">  
      <Card className="card">
        <h1>Browse Comics</h1>
        <img src={Comics} alt="Comics Category" className="card-content"></img>
        <br />
        <Link to="/categories" state={"Comics"} className="link">
          Shop Now
        </Link>
      </Card>
      <Card className="card">
        <h1>Artemis Fowl</h1>
        <img src={ArtemisFowl} alt="Artemis Fowl" className="card-content"></img>
        <br />
        <Link to="/" className="link">
          View Product
        </Link>
      </Card>
      <Card className="card">
        <h1>Moby Dick</h1>
        <img src={MobyDick} alt="Moby Dick" className="card-content"></img>
        <br />
        <Link to="/" className="link">
          View Product
        </Link>
      </Card>
      <Card className="card">
        <h1>Shop By Category</h1>
        <div className="card-content">
          {catCard.map((e) => {
            return (
              <img
                src={e}
                alt="category"
                className="card-category"
                onClick={() => console.log("beauty")}
              ></img>
            );
          })}
          <br />
          <Link to="/" className="link">
            Shop All
          </Link>
        </div>
      </Card>
    </div>
  </div>
  </>
)
}

export default Home;
