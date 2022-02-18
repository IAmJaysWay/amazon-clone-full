import {Card, Rate} from 'antd';
import { Link } from 'react-router-dom';
import "./Results.css";
import {books} from "../books.js";

function Results({category, rating, priceMin, priceMax}) {

 const bookCategory = books[category].filter(x => x.rating >= rating).filter(x => x.price > priceMin).filter(x => x.price <= priceMax);
    console.log(bookCategory);
  return (
    <>
  {bookCategory.map((e,i) => {
    return (
      <Card>
      <div style={{ display: "flex" }}>
        <img src={e.image} alt={i} width="300px"></img>
        <div>
          <p className="title">
            {e.name}
          </p>
          <Rate value={e.rating} disabled={true}></Rate>
          <h2> ${e.price}</h2>
          <p>
            Ships to Your Location
          </p>
          <Link to="/product" state={e} className="login">
          Got to Product Page
        </Link>
        </div>
      </div>
    </Card>
    );
  })}
  </>
  )
}

export default Results