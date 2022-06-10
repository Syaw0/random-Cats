import React, { useState, useEffect } from "react";
import Loader from "../components/loader";
import useStore from "../store/store";
import Empty from "../components/Empty";
import FavCard from "../components/FavCard";

function Favorite() {
  const isLoading = useStore((state) => state.isLoadingFav);
  const setFavList = useStore((state) => state.insertImgToFavList);
  const favList = useStore((state) => state.favImgs);

  useEffect(() => {
    setFavList();
  }, []);

  return (
    <>
      <div id="Favorite_con">
        {false && <Loader />}
        {true && (
          <div id="Fav_list">
            {favList.length == 0 && <Empty />}
            {favList.length != 0 &&
              favList.map((v, i) => <FavCard key={i} img={v} />)}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorite;
