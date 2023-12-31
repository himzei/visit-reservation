import "./OrderItem.css";
import { useContext, useRef, useState } from "react";
import UpIcon from "../assets/svg/arrow-top.svg";
import UpIconWhite from "../assets/svg/arrow-top-white.svg";
import BottomIcon from "../assets/svg/arrow-bottom.svg";
import BottomIconWhite from "../assets/svg/arrow-bottom-white.svg";
import { VisitSiteContext } from "../context/VisitSiteContext";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AddPurposeOfVisit from "./AddPurposeOfVisit";
import { useMutation } from "react-query";
import { apiPurposeOfVisitDelete, apiPurposeOfVisitEdit } from "../api";
import useVisitSite from "../hooks/useVisitSite";

export default function OrderItemOne({ lists, title }) {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [editTitle, setEditTitle] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectEdit, setSelectEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setPlaceVisitIndex, purposeOfVisit } = useContext(VisitSiteContext);
  const [items, setItems] = useState(lists);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemRefs = useRef([]);
  const addRefs = useRef();

  // 수정
  // 순서 index와
  // 수정
  const { mutate } = useMutation(apiPurposeOfVisitEdit);

  const handleEditClick = (index, purposeOfVisitIndex) => {
    setEditIndex(index);
    const editPurposeOfVisit = purposeOfVisit?.filter(
      (item) => item.purposeOfVisitIndex === purposeOfVisitIndex
    );
    setSelectEdit(editPurposeOfVisit);
    setEditTitle(editPurposeOfVisit[0].title);
    // 방목목적 수정 하는 api 호출
  };

  const handleClick = (index, placeToVisitIndex) => {
    setSelectedItem(index);
    setPlaceVisitIndex(placeToVisitIndex);
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

  const handleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate([
      editTitle,
      {
        visitSiteIndex,
        purposeOfVisitIndex: selectEdit[0].purposeOfVisitIndex,
        parentIndex: selectEdit[0].parentIndex,
        itemOrder: selectEdit[0].itemOrder,
      },
    ]);
    // queryClient.invalidateQueries("getPurposeOfVisit");
    window.location.reload();
    setTimeout(() => {
      setEditIndex(null);
    }, 1000);
  };

  // 삭제
  const handleDeleteClick = (index) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      apiPurposeOfVisitDelete(index);
      window.location.reload();
    }
  };

  const orderedItems = items.sort((a, b) => a.itemOrder - b.itemOrder);

  return (
    <>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>방문목적 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPurposeOfVisit onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="location-first">
        <div className="" ref={(el) => (addRefs.current = el)}>
          <div>{title}</div>
          <div className="add-btn" onClick={onOpen}>
            + 추가
          </div>
        </div>
        <div>
          <div>
            <ul>
              {orderedItems?.map((item, index) => (
                <div key={index}>
                  {editIndex === index ? (
                    <form onSubmit={handleSubmit}>
                      <div
                        className="item-group"
                        ref={(el) => (itemRefs.current[index] = el)}
                        key={index}
                        style={{
                          backgroundColor:
                            selectedItem === index ? "#0066FF" : "",
                          color: selectedItem === index ? "white" : "",
                        }}
                      >
                        {/* 1 */}

                        <div className="icon-group">
                          <img
                            onClick={() => moveDown(index)}
                            src={
                              selectedItem === index
                                ? BottomIconWhite
                                : BottomIcon
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
                          onClick={() =>
                            handleClick(index, item.placeToVisitIndex)
                          }
                        >
                          <div>
                            <Input
                              onChange={handleChange}
                              name="title"
                              px="1"
                              size="xs"
                              type="text"
                              w="140px"
                              bg="white"
                              color="black"
                              defaultValue={selectEdit[0].title}
                            />
                          </div>
                          <div className="edit-delete__btn">
                            <div>
                              <Button
                                type="submit"
                                size="xs"
                                variant="outline"
                                color="white"
                              >
                                저장
                              </Button>
                            </div>
                            <div onClick={() => setEditIndex(null)}>
                              <Button variant="outline" size="xs" color="white">
                                취소
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div
                      className="item-group"
                      ref={(el) => (itemRefs.current[index] = el)}
                      style={{
                        backgroundColor:
                          selectedItem === index ? "#0066FF" : "",
                        color: selectedItem === index ? "white" : "",
                      }}
                    >
                      {/* {console.log(itemRefs.current[index])} */}
                      {/* 1 */}

                      <div className="icon-group">
                        <img
                          onClick={() => moveDown(index)}
                          src={
                            selectedItem === index
                              ? BottomIconWhite
                              : BottomIcon
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
                        onClick={() =>
                          handleClick(index, item.placeToVisitIndex)
                        }
                      >
                        <div>{item.title}</div>
                        <div className="edit-delete__btn">
                          <div
                            onClick={() =>
                              handleEditClick(index, item.purposeOfVisitIndex)
                            }
                          >
                            <Button size="xs">수정</Button>
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(item.purposeOfVisitIndex)
                            }
                          >
                            <Button size="xs">삭제</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
