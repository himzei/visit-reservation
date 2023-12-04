import { useState } from "react";
import ReactDragList from "react-drag-list";

export default function MenuVisitPrupose({ lists }) {
  const [itemList, setItemList] = useState(lists);

  return (
    <ReactDragList
      dataSource={itemList}
      row={(record, index) => (
        <div>
          {index},{record}
        </div>
      )}
    />
  );
}
