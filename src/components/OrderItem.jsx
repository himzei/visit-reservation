import "./OrderItem.css";
import { useRef, useState } from "react";
import UpIcon from "../assets/svg/arrow-top.svg";
import UpIconWhite from "../assets/svg/arrow-top-white.svg";
import BottomIcon from "../assets/svg/arrow-bottom.svg";
import BottomIconWhite from "../assets/svg/arrow-bottom-white.svg";

export default function OrderItem({ lists }) {
  const [items, setItems] = useState(lists);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemRefs = useRef([]);

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

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
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
                src={selectedItem === index ? BottomIconWhite : BottomIcon}
                alt="bottom icon"
              />
              <img
                onClick={() => moveUp(index)}
                src={selectedItem === index ? UpIconWhite : UpIcon}
                alt="up icon"
              />
            </div>

            {/* 2 */}
            <div className="edit-delete" onClick={() => handleClick(index)}>
              <div>{item}</div>
              <div className="edit-delete__btn">
                <div>수정</div>
                <div>삭제</div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
