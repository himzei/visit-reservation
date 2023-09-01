import "./OrderItem.css";
import { useRef, useState } from "react";
import UpIcon from "../assets/svg/arrow-top.svg";
import BottomIcon from "../assets/svg/arrow-bottom.svg";

export default function OrderItem() {
  const [items, setItems] = useState([
    "1학년",
    "2학년",
    "3학년",
    "항목 4",
    "항목 5",
  ]);
  const moveUp = (index) => {
    if (index > 0) {
      const newItems = [...items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      setItems(newItems);
    }
  };

  const moveDown = (index) => {
    if (index < items.length - 1) {
      const newItems = [...items];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      setItems(newItems);
    }
  };

  const ref = useRef();

  console.log(ref.current);
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <div className="item-group" ref={ref}>
            {/* 1 */}
            <div>
              <div className="icon-group">
                <img
                  onClick={() => moveDown(index)}
                  src={BottomIcon}
                  alt="bottom icon"
                />
                <img onClick={() => moveUp(index)} src={UpIcon} alt="up icon" />
              </div>
              <div>{item}</div>
            </div>
            {/* 2 */}
            <div className="edit-delete">
              <div>수정</div>
              <div>삭제</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
