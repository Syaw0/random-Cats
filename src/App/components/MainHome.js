import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import Button from "../components/Button";
import Loader from "./loader";

function MainHome() {
  const getCat = useStore((state) => state.setCurrentImg);
  const CatImg = useStore((state) => state.currentImg);
  const isFailCall = useStore((state) => state.failCall);
  const isRepeat = useStore((state) => state.isRepeatImg);
  const setIsRepeat = useStore((state) => state.setRepeatImg);
  const isLoading = useStore((state) => state.isLoadingHome);

  useEffect(() => {
    getCat();
  }, []);


  const ClickHandle = () => {
    let PreFav = JSON.parse(localStorage.getItem("favImgs"));

    if (PreFav.find((v) => v == CatImg)) {
      let newvalue = PreFav.filter((v) => {
        return v != CatImg;
      });
      newvalue = JSON.stringify(newvalue);
      localStorage.setItem("favImgs", newvalue);
      setIsRepeat(false);
    } else {
      PreFav.push(CatImg);
      PreFav = JSON.stringify(PreFav);
      localStorage.setItem("favImgs", PreFav);
      setIsRepeat(true);
    }
  };

  return (
    <>
      <div id="MainHome_con">
        <div id="Cat_card">
          {!isLoading && !isFailCall && (
            <>
              <img id="Cat_card_img" src={CatImg || ""} alt="cat img" />
              <div id="Cat_card_btns">
              <Button
                id="AddToFavList"
                event={ClickHandle}
                inner={isRepeat ? "DELETE ITEM" : "ADD TO FAV"}
                type={"text"}
              />
              <Button
                id="NextImg"
                event={() => {
                  getCat();
                }}
                inner="See Next"
                type={"primary"}
              />
              </div>
            </>
          )}
          {isLoading && <Loader />}
        </div>
        {isFailCall && (
          <div id="FailCall_con">
            <h1>Failed</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MainHome;
