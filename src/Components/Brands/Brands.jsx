import { Link } from "react-router-dom";

const Brands = () => {
  return (
    <div className="brands">
      <div className="container">
        <div className="wrapper flexitem">
          <div className="item">
            <Link to="#">
              <img
                style={{ width: "100px" }}
                src="data:image/jpeg;base64,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"
                alt="zara"
              />
            </Link>
          </div>

          <div className="item">
            <Link to="#">
              <img
                style={{ width: "100px" }}
                src="https://www.designyourway.net/blog/wp-content/uploads/2019/10/s1-61.jpg"
                alt="samsung"
              />
            </Link>
          </div>

          <div className="item">
            <Link to="#">
              <img
                style={{ width: "100px" }}
                src="https://th.bing.com/th?id=OIP.dWxMQ3DOEfkDVsURbUg5gwHaCz&w=349&h=132&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                alt="oppo"
              />
            </Link>
          </div>

          <div className="item">
            <Link to="#">
              <img
                style={{ width: "100px" }}
                src="data:image/jpeg;base64,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"
                alt="asus"
              />
            </Link>
          </div>

          <div className="item">
            <Link to="#">
              <img
                style={{ width: "100px" }}
                src="https://th.bing.com/th/id/OIP.tGCRmPG0HF8DTd-B4Ma6BQHaB6?w=338&h=90&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="hurley"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
