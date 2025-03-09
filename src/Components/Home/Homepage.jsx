import Banners from "../Banners/Banners";
import Brands from "../Brands/Brands";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Slider from "../Swiper/Swiper";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import Blog from "../Blog/Blog";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { addToFav, removeFromFav } from "../../Redux/CartReducer";
import toast from "react-hot-toast";
import { CiCircleAlert } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const savedIds = localStorage.getItem("selectedIds");
    if (savedIds) {
      setSelectedIds(JSON.parse(savedIds));
    }
  }, []);

  // Fav
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleFavorite = (id, item) => {
    if (!item) {
      console.log(`item with id ${id} not found`);
      return;
    }
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((itemId) => itemId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
    localStorage.setItem("selectedIds", JSON.stringify(newSelectedIds));

    if (newSelectedIds.includes(id)) {
      dispatch(
        addToFav({
          id: item.id,
          title: item.title,
          img: item.thumbnail,
          price: item.price,
          discountPercentage: item.discountPercentage,
          priceAfterDiscount: item.priceAfterDiscount,
          priceBeforeDiscount: item.priceBeforeDiscount,
          rating: item.rating,
          brand: item.brand,
        })
      );
      toast.success(`${item.title} has been added to favorites!`);
    } else {
      dispatch(removeFromFav({ id }));
      toast.error(`${item.title} has been removed from favorites!`);
    }
  };

  return (
    <main>
      <Slider />
      <Brands />
      <TrendingProducts
        toggleFavorite={toggleFavorite}
        selectedIds={selectedIds}
        dispatch={dispatch}
      />
      <FeaturedProducts
        toggleFavorite={toggleFavorite}
        selectedIds={selectedIds}
        dispatch={dispatch}
      />
      <Blog />
      <Banners />
    </main>
  );
};

export default Homepage;
