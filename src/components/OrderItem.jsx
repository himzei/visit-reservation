import "./OrderItem.css";
import { useContext, useRef, useState } from "react";
import UpIcon from "../assets/svg/arrow-top.svg";
import UpIconWhite from "../assets/svg/arrow-top-white.svg";
import BottomIcon from "../assets/svg/arrow-bottom.svg";
import BottomIconWhite from "../assets/svg/arrow-bottom-white.svg";
import { VisitSiteContext } from "../context/VisitSiteContext";

export default function OrderItem({ lists, title }) {
  const { handleAddModal, setPlaceVisitIndex } = useContext(VisitSiteContext);

  const [items, setItems] = useState(lists);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemRefs = useRef([]);
  const addRefs = useRef();

  const handleCheckParent = () => {
    handleAddModal();
  };

  const moveUp = (index) => {
    if (index > 0) {
      const newItems = [...items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      setItems(newItems);
      setSelectedItem(index - 1);
    }
  };

  const moveDown = (index) => {
    if (index < items.length - 1) {
      const newItems = [...items];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      setItems(newItems);
      setSelectedItem(index + 1);
    }
  };

  const handleClick = (index, placeToVisitIndex) => {
    setSelectedItem(index);
    setPlaceVisitIndex(placeToVisitIndex);
  };

  return (
    <>
      <div className="location-first">
        <div className="" ref={(el) => (addRefs.current = el)}>
          <div>{title}</div>
          <div className="add-btn" onClick={handleCheckParent}>
            + 추가
          </div>
        </div>
        <div>
          <div>
            <ul>
              {items?.map((item, index) => (
                <div
                  className="item-group"
                  ref={(el) => (itemRefs.current[index] = el)}
                  key={index}
                  style={{
                    backgroundColor: selectedItem === index ? "#0066FF" : "",
                    color: selectedItem === index ? "white" : "",
                  }}
                >
                  {/* {console.log(itemRefs.current[index])} */}
                  {/* 1 */}

                  <div className="icon-group">
                    <img
                      onClick={() => moveDown(index)}
                      src={
                        selectedItem === index ? BottomIconWhite : BottomIcon
                      }
                      alt="bottom icon"
                    />
                    <img
                      onClick={() => moveUp(index)}
                      src={selectedItem === index ? UpIconWhite : UpIcon}
                      alt="up icon"
                    />
                  </div>

                  {/* 2 */}
                  <div
                    className="edit-delete"
                    onClick={() => handleClick(index, item.placeToVisitIndex)}
                  >
                    <div>{item.title}</div>
                    <div className="edit-delete__btn">
                      <div>수정</div>
                      <div>삭제</div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="location-first">
        <div className="">
          <div>{title}</div>
          <div className="add-btn">+ 추가</div>
        </div>
        <div>
          <div>
            <ul>
              {items?.map((item, index) => (
                <div className="item-group" key={index}>
                  {/* {console.log(itemRefs.current[index])} */}
                  {/* 1 */}

                  <div className="icon-group">
                    <img src={BottomIcon} alt="bottom icon" />
                    <img src={UpIcon} alt="up icon" />
                  </div>

                  {/* 2 */}
                  <div
                    className="edit-delete"
                    onClick={() => handleClick(index, item.placeToVisitIndex)}
                  >
                    <div>{item.title}</div>
                    <div className="edit-delete__btn">
                      <div>수정</div>
                      <div>삭제</div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
