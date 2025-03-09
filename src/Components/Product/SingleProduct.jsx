import { Link, useParams } from "react-router-dom";
import productData from "../../products.json";
import { addToCart, addToFav, removeFromFav } from "../../Redux/CartReducer";
import { LuHeart } from "react-icons/lu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { id } = useParams();
  const product = productData.find((p) => p.id === parseInt(id));
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(1);
  const [mainImage, setMainImage] = useState(product.thumbnail);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? false : id);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const savedIds = localStorage.getItem("selectedIds");
    if (savedIds) {
      setSelectedIds(JSON.parse(savedIds));
    }
  }, []);

  // Fav
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleFavorite = (id) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((itemId) => itemId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
    localStorage.setItem("selectedIds", JSON.stringify(newSelectedIds));

    newSelectedIds.includes(id)
      ? dispatch(
          addToFav({
            id: product.id,
            title: product.title,
            img: product.thumbnail,
            price: product.price,
            discountPercentage: product.discountPercentage,
            priceAfterDiscount: product.priceAfterDiscount,
            rating: product.rating,
            brand: product.brand,
          }),
          toast.success(`${product.title} has been added to favorites!`)
        )
      : dispatch(
          removeFromFav({
            id: id,
          }),
          toast.error(`${product.title} has been removed from favorites!`)
        );
  };

  // Count
  const countPlus = () => {
    setCount(Number(count + 1));
  };
  const countMinus = () => {
    Number(count === 0 ? setCount(count) : setCount(count - 1));
  };

  // Update mainImage when product changes
  useEffect(() => {
    if (product) {
      setMainImage(
        product.images && product.images.length > 0
          ? product.thumbnail
          : product.images[0]
      );
    }
  }, [product]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div>
      <div className="single-product">
        <div className="container">
          <div className="wrapper">
            <div className="column">
              <div className="products one">
                <div className="flexwrap">
                  <div className="row">
                    <div className="item is_sticky">
                      <div className="price">
                        <span className="discount">
                          {product.discountPercentage > 0
                            ? `${product.discountPercentage}%`
                            : ""}
                          <br />
                          OFF
                        </span>
                      </div>
                      <div className="big-image">
                        <div className="big-image-wrapper swiper-wrapper">
                          <div className="image-show swiper-slide">
                            <a data-fslightbox>
                              <img
                                src={mainImage}
                                alt={product.title}
                                style={{ cursor: "pointer" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="small-image">
                        <ul className="small-image-wrapper flexitem swiper-wrapper">
                          {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                              <li
                                key={index}
                                className="thumbnail-show swiper-slide"
                                onClick={() => handleThumbnailClick(image)}
                              >
                                <img
                                  src={image}
                                  alt={image}
                                  style={{ cursor: "pointer" }}
                                />
                              </li>
                            ))
                          ) : (
                            <p>There are no photos to show</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="item">
                      <h1>{product.title}</h1>
                      <div className="content">
                        <div className="rating">
                          <div className="stars"></div>
                          <a href="#" className="mini-text">
                            ({product.rating}) Reviews
                          </a>
                        </div>
                        <div className="stock-sku">
                          <span className="available">
                            In Stock: {product.stock}
                          </span>
                          <span className="sku mini-text">SKU-881</span>
                        </div>
                        <div className="price">
                          <span className="current">
                            {product.priceAfterDiscount > 0
                              ? `$${product.priceAfterDiscount}`
                              : `$${product.price}`}
                          </span>
                          <span className="normal">
                            {product.priceBeforeDiscount > 0
                              ? `$${product.priceBeforeDiscount}`
                              : ``}
                          </span>
                        </div>

                        <div>
                          <b>Brand:</b> {product.brand ?? "none"}
                        </div>
                        <div className="actions">
                          <div className="qty-control flexitem">
                            <button
                              className="minus circle"
                              onClick={countMinus}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={count}
                              min={1}
                              onChange={(e) =>
                                setCount(Number(e.target.value) || 1)
                              }
                            />
                            <button className="plus circle" onClick={countPlus}>
                              +
                            </button>
                          </div>
                          <div className="button-cart">
                            <button
                              className="primary-button"
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    id: product.id,
                                    title: product.title,
                                    img: product.thumbnail,
                                    price: product.price,
                                    priceAfterDiscount:
                                      product.priceAfterDiscount,
                                    count: count,
                                    total: product.count * count,
                                  })
                                )
                              }
                            >
                              Add to cart
                            </button>
                          </div>
                          <div className="wish-share">
                            <ul className="flexitem second-links">
                              <li>
                                <a href="">
                                  <span
                                    className="icon-large"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      dispatch(
                                        addToFav({
                                          id: product.id,
                                          title: product.title,
                                          img: product.thumbnail,
                                          price: product.price,
                                          discountPercentage:
                                            product.discountPercentage,
                                          priceAfterDiscount:
                                            product.priceAfterDiscount,
                                          priceBeforeDiscount:
                                            product.priceBeforeDiscount,
                                          rating: product.rating,
                                          brand: product.brand,
                                        })
                                      );
                                      toggleFavorite(product.id);
                                    }}
                                  >
                                    <LuHeart
                                      style={
                                        selectedIds
                                          ? selectedIds.includes(product.id)
                                            ? {
                                                fill: "#ff6b6b",
                                                opacity: "1",
                                                color: "#ff6b6b",
                                              }
                                            : {}
                                          : {}
                                      }
                                    />
                                    <span>Wishlist</span>
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="description collapse">
                          <ul>
                            <li
                              className={`has-child ${
                                expanded === 0 ? "expand" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(0);
                              }}
                            >
                              <Link to="" className="icon-small">
                                Information
                              </Link>
                              <ul className="content">
                                <li>
                                  <span>Brands</span>
                                  <span>{product.brand}</span>
                                </li>
                                <li>
                                  <span>Category</span>
                                  <span>{product.category}</span>
                                </li>
                              </ul>
                            </li>

                            <li
                              className={`has-child ${
                                expanded === 1 ? "expand" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(1);
                              }}
                            >
                              <Link to="" className="icon-small">
                                Details
                              </Link>
                              <div className="content">
                                <p>{product.description}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts
        toggleFavorite={toggleFavorite}
        selectedIds={selectedIds}
        dispatch={dispatch}
      />
    </div>
  );
};

export default SingleProduct;
