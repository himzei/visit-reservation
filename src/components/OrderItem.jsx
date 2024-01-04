import "./OrderItem.css";
import { useRef, useState } from "react";
import UpIcon from "../assets/svg/arrow-top.svg";
import UpIconWhite from "../assets/svg/arrow-top-white.svg";
import BottomIcon from "../assets/svg/arrow-bottom.svg";
import BottomIconWhite from "../assets/svg/arrow-bottom-white.svg";

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

import AddPlaceToVisit from "./AddPlaceToVisit";
import { apiPlaceToVisitDelete, apiPlactToVisitEdit } from "../api";
import { useMutation, useQueryClient } from "react-query";
import useVisitSite from "../hooks/useVisitSite";

export default function OrderItem({ lists }) {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [editIndex, setEditIndex] = useState(null);
  const [editSecondIndex, setEditSecondIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSecondTitle, setEditSecondTitle] = useState("");

  const [selectEdit, setSelectEdit] = useState(null);
  const [selectSecondEdit, setSelectSecondEdit] = useState(null);

  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFirst,
    onOpen: onOpenFirst,
    onClose: onCloseFirst,
  } = useDisclosure();
  const [checkIndex, setCheckIndex] = useState(-1);
  const [items, setItems] = useState(lists);
  const [itemsChild, setItemsChild] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSecondItem, setSelectedSecondItem] = useState(null);
  const itemRefs = useRef([]);
  const addRefs = useRef();

  const itemsParent = lists.filter((item) => item.parentIndex === -1);

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

    setEditSecondIndex(null);
    setCheckIndex(placeToVisitIndex);
    const temp = items.filter((item) => item.parentIndex === placeToVisitIndex);
    setItemsChild(temp);
  };

  // parent 추가
  const handleAddParent = () => {
    onOpenFirst();
  };

  // child 추가
  const handleAddChild = () => {
    if (checkIndex === -1) {
      alert("학급 카테고리를 먼저 선택해 주세요");
      return;
    }
    onOpen();
  };

  // placeToVisit Title 수정
  const { mutate: mutateTitleEdit } = useMutation(apiPlactToVisitEdit);

  const { mutate } = useMutation(apiPlaceToVisitDelete, {
    onSuccess: (data) => {
      if (data.result === 0) {
        queryClient.invalidateQueries("getVisitSite");
      }
    },
  });

  // 삭제
  const handleDeleteClick = (index) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      mutate(index);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutateTitleEdit([
      editTitle,
      {
        visitSiteIndex,
        placeToVisitIndex: selectEdit[0].placeToVisitIndex,
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

  const handleSubmitSecond = (e) => {
    e.preventDefault();

    mutateTitleEdit([
      editSecondTitle,
      {
        visitSiteIndex,
        placeToVisitIndex: selectSecondEdit[0].placeToVisitIndex,
        parentIndex: selectSecondEdit[0].parentIndex,
        itemOrder: selectSecondEdit[0].itemOrder,
      },
    ]);
    // queryClient.invalidateQueries("getPurposeOfVisit");
    window.location.reload();
    setTimeout(() => {
      setEditIndex(null);
    }, 1000);
  };

  const handleEditClick = (index, placeToVisitIndex) => {
    setEditIndex(index);
    const editPlaceToVisit = itemsParent?.filter(
      (item) => item.placeToVisitIndex === placeToVisitIndex
    );
    setSelectEdit(editPlaceToVisit);
    setEditTitle(editPlaceToVisit[0].title);
    // 방목목적 수정 하는 api 호출
  };

  const handleChange = (e) => {
    setEditTitle(e.target.value);
  };
  const handleChangeSecond = (e) => {
    setEditSecondTitle(e.target.value);
  };

  const handleEditSecondClick = (index, placeToVisitIndex) => {
    setEditSecondIndex(index);
    const editPlaceToVisit = itemsChild?.filter(
      (item) => item.placeToVisitIndex === placeToVisitIndex
    );

    setSelectSecondEdit(editPlaceToVisit);
    setEditSecondTitle(editPlaceToVisit[0].title);
    // 방목목적 수정 하는 api 호출
  };

  return (
    <>
      {/* 학년 */}
      <Modal onClose={onCloseFirst} size="xl" isOpen={isOpenFirst}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>학급 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPlaceToVisit onClose={onCloseFirst} checkIndex={checkIndex} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* 반 */}
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>반 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPlaceToVisit onClose={onClose} checkIndex={checkIndex} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="location-first">
        <div className="" ref={(el) => (addRefs.current = el)}>
          <div>학년</div>
          <div className="add-btn" onClick={() => handleAddParent()}>
            + 추가
          </div>
        </div>
        <div>
          <div>
            <ul>
              {itemsParent?.map((item, index) => (
                <div key={index}>
                  {editIndex === index ? (
                    <form onSubmit={handleSubmit}>
                      <div
                        className="item-group"
                        ref={(el) => (itemRefs.current[index] = el)}
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
                              handleEditClick(index, item.placeToVisitIndex)
                            }
                          >
                            <Button size="xs">수정</Button>
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(item.placeToVisitIndex)
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

      <div className="location-first">
        <div className="">
          <div>반</div>
          <div className="add-btn" onClick={() => handleAddChild()}>
            + 추가
          </div>
        </div>
        <div>
          <div>
            <ul>
              {itemsChild?.map((item, index) => (
                <div key={index}>
                  {editSecondIndex === index ? (
                    <form onSubmit={handleSubmitSecond}>
                      <div
                        className="item-group"
                        ref={(el) => (itemRefs.current[index] = el)}
                        key={index}
                        style={{
                          backgroundColor:
                            selectedSecondItem === index ? "#0066FF" : "",
                          color: selectedSecondItem === index ? "white" : "",
                        }}
                      >
                        {/* 1 */}

                        <div className="icon-group">
                          <img
                            onClick={() => moveDown(index)}
                            src={
                              selectedSecondItem === index
                                ? BottomIconWhite
                                : BottomIcon
                            }
                            alt="bottom icon"
                          />
                          <img
                            onClick={() => moveUp(index)}
                            src={
                              selectedSecondItem === index
                                ? UpIconWhite
                                : UpIcon
                            }
                            alt="up icon"
                          />
                        </div>

                        {/* 2 */}
                        <div className="edit-delete">
                          <div>
                            <Input
                              onChange={handleChangeSecond}
                              name="title"
                              px="1"
                              size="xs"
                              type="text"
                              w="140px"
                              bg="white"
                              color="black"
                              defaultValue={selectSecondEdit[0].title}
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
                            <div onClick={() => setEditSecondIndex(null)}>
                              <Button variant="outline" size="xs" color="white">
                                취소
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="item-group">
                      {/* {console.log(itemRefs.current[index])} */}
                      {/* 1 */}

                      <div className="icon-group">
                        <img src={BottomIcon} alt="bottom icon" />
                        <img src={UpIcon} alt="up icon" />
                      </div>

                      {/* 2 */}
                      <div className="edit-delete">
                        <div>{item.title}</div>
                        <div className="edit-delete__btn">
                          <div
                            onClick={() =>
                              handleEditSecondClick(
                                index,
                                item.placeToVisitIndex
                              )
                            }
                          >
                            <Button size="xs">수정</Button>
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(item.placeToVisitIndex)
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
