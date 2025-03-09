import { FaArrowRight } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { addToCart } from "../../Redux/CartReducer";
import Data from "../../products.json";

import { Link } from "react-router-dom";

const FeaturedProducts = ({ toggleFavorite, selectedIds, dispatch }) => {
  const handlePageClickWithScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="features" id="features">
      <div className="container">
        <div className="wrapper">
          <div className="column">
            <div className="sectop flexitem">
              <h2>
                <span className="circle"></span>
                <span>Featured Products</span>
              </h2>
              <div className="second-links">
                <Link
                  onClick={handlePageClickWithScroll}
                  to="/shop"
                  className="view-all"
                >
                  View All Products
                  <FaArrowRight style={{ marginTop: "2px" }} />
                </Link>
              </div>
            </div>

            <div className="products main flexwrap">
              {Data.slice(0, 8).map((item) => (
                <div className="item" key={item.id}>
                  <div className="media" style={{ height: "300px" }}>
                    <div className="thumbnail object-cover">
                      <Link
                        onClick={handlePageClickWithScroll}
                        to={`/singleproduct/${item.id}`}
                      >
                        <img src={item.thumbnail} alt="photo"></img>
                      </Link>
                    </div>
                    <div className="hoverable">
                      <ul>
                        <li className="active">
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(item.id, item);
                            }}
                            style={
                              selectedIds
                                ? selectedIds.includes(item.id)
                                  ? {
                                      backgroundColor: "#ff6b6b",
                                      opacity: "1",
                                      color: "white",
                                    }
                                  : {}
                                : {}
                            }
                          >
                            <LuHeart />
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            dispatch(
                              addToCart({
                                id: item.id,
                                title: item.title,
                                img: item.thumbnail,
                                price: item.priceAfte,
                                brand: item.brand,
                                discountPercentage: item.discountPercentage,
                                priceAfterDiscount: item.priceAfterDiscount,
                              })
                            );
                          }}
                        >
                          <Link to="#">
                            <MdAddShoppingCart />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="discount circle flexcenter">
                      <span>{item.discountPercentage}%</span>
                    </div>
                  </div>
                  <div className="content">
                    <div className="rating">
                      <div className="stars"></div>
                      <span className="mini-text">({item.rating})</span>
                    </div>
                    <h3 className="main-links">
                      <Link
                        onClick={handlePageClickWithScroll}
                        to={`/singleproduct/${item.id}`}
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p>Stock : {item.stock}</p>
                    <div className="price">
                      <span className="current">
                        {item.priceAfterDiscount > 0
                          ? `$${item.priceAfterDiscount}`
                          : `$${item.price}`}
                      </span>
                      <span className="normal mini-text">
                        {item.priceBeforeDiscount > 0
                          ? `$${item.priceBeforeDiscount}`
                          : ``}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
