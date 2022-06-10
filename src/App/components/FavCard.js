import React, { useState } from "react";
import Button from "./Button";
import useStore from "../store/store";
function FavCard(props) {
  const [isPopup, setIsPopup] = useState({ status: false });
  const setFavList = useStore((state) => state.insertImgToFavList);
  const deleteSpecificItemFromList = useStore(
    (state) => state.deleteSpecificItemFromList
  ); 

  const handleClick = (e, query) => {
    switch (query) {
      case "showPopup":
        setIsPopup({ status: true });
        break;
      case "hidePopup":
        setIsPopup({ status: false });
        break;
    }
  };

  const handleRemovingItems = () => {
    deleteSpecificItemFromList(props.img);
    setFavList();
  };

  return (
    <>
      <div className="Fav_card">
        <img
          className="Fav_card_img"
          src={props.img}
          alt="cat img"
          onClick={(e) => {
            handleClick(e, "showPopup");
          }}
        />
        <Button
          inner="Remove From Favorite"
          type="Fav_remove_item  underImgbtn"
          event={handleRemovingItems}
        />
      </div>
        {isPopup.status && (
          <div id="Popup_con">
            <Button
              inner="close"
              id="ClosePopup"
              event={(e) => {
                handleClick(e, "hidePopup");
              }}
            />
            <img src={props.img} className="PopupImg" alt="cat img" />
          </div>
        )}
    </>
  );
}

export default FavCard;
