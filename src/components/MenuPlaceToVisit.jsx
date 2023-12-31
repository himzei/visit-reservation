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
import React from "react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import AddPlaceToVisit from "./AddPlaceToVisit";
import useVisitSite from "../hooks/useVisitSite";
import { useMutation, useQueryClient } from "react-query";
import { apiPlaceToVisitDelete, apiPlactToVisitEdit } from "../api";
import { useEffect } from "react";

export default function MenuPlaceToVisit({ lists, title }) {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [selectEdit, setSelectEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editSecondIndex, setEditSecondIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [placeVisitIndex, setPlaceVisitIndex] = useState(0);
  const [placeToVisitSecond, setPlaceToVisitSecond] = useState([]);

  const [checkIndex, setCheckIndex] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFirst,
    onOpen: onOpenFirst,
    onClose: onCloseFirst,
  } = useDisclosure();

  // parent 추가
  const handleAddParent = () => {
    onOpenFirst();
  };

  // child 추가
  const handleAddChild = () => {
    if (placeVisitIndex === null) {
      alert("학급 카테고리를 먼저 선택해 주세요");
      return;
    }
    onOpen();
  };

  const [placeToVisit, setPlaceToVisit] = useState(
    lists
      ?.filter((item) => item.parentIndex === -1)
      .sort((a, b) => parseInt(a?.itemOrder) - (parseInt(b?.itemOrder) || 1))
  );


  useEffect(() => {
    const temp = lists
      ?.filter((item) => item.parentIndex === placeVisitIndex)
      .sort((a, b) => parseInt(a?.itemOrder) - (parseInt(b?.itemOrder) || 1));
    setPlaceToVisitSecond(temp);
  }, [placeVisitIndex]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(apiPlactToVisitEdit, {
    onSuccess: (data) => {
      if (data.result === 0) {
        setEditIndex(null); 
        // 순서저장이 모두 완료 되었을때 페이지를 새로고침 
        queryClient.invalidateQueries(["getVisitSite"]).then(() => {
          window.location.reload();
        });
      }
    },
    // 오류 처리를 위한 추가적 인 콜백을 여기에 배치할 수 있습니다.
    onError: (error) => {
      // 에러 핸들링 로직
    },
  });

  const handleOrderSave = () => {
    // 학급 순서 저장 로직
    placeToVisit?.forEach((item, index) => {
      mutate([
        item.title,
        {
          visitSiteIndex,
          placeToVisitIndex: item.placeToVisitIndex, 
          parentIndex: item.parentIndex,
          itemOrder: index + 1,
        },
      ]);
    });
    // 반 순서 저장 로직
    placeToVisitSecond.forEach((item, index) => {
      mutate([
        item.title,
        {
          visitSiteIndex,
          placeToVisitIndex: item.placeToVisitIndex,
          parentIndex: item.parentIndex,
          itemOrder: index + 1,
        },
      ]);
    });
  };

  console.log('학급',placeToVisit)
  console.log('반',placeToVisitSecond)

  const handleEditClick = (index, placeToVisitIndex, secondSelect) => {
    if (secondSelect === "select") {
      setEditSecondIndex(index);
    } else {
      setEditIndex(index);
    }
    const editPlaceToVisit = lists?.filter(
      (item) => item.placeToVisitIndex === placeToVisitIndex
    );
    setSelectEdit(editPlaceToVisit);
    setEditTitle(editPlaceToVisit[0].title);
    // 방목목적 수정 하는 api 호출
  };

  // 삭제
  const handleDeleteClick = (index) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      apiPlaceToVisitDelete(index);
      alert('삭제가 완료 되었습니다.')
      window.location.reload();
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
        placeToVisitIndex: selectEdit[0].placeToVisitIndex,
        parentIndex: selectEdit[0].parentIndex,
        itemOrder: selectEdit[0].itemOrder,
      },
    ]);
  };

  const handleClick = (index, placeToVisitIndex, second) => {
    setSelectedItem(index);
    setPlaceVisitIndex(placeToVisitIndex);
  };
  return (
    <div className="draggable-menu">
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
            <AddPlaceToVisit onClose={onClose} checkIndex={placeVisitIndex} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="group-drag">
        <div className="drag-parent-lists">
          <div className="draggable-title">
            <div>{title}</div>
            <div className="add-btn" onClick={() => handleAddParent()}>
              + 추가
            </div>
          </div>
          <div className="draggable-contents">
            <ul>
              <ReactSortable
                list={placeToVisit}
                setList={setPlaceToVisit}
                animation={200}
                delayOnTouchOnly={true}
                delay={2}
              >
                {placeToVisit?.map((item, index) => (
                  <div key={index}>
                    {editIndex === index ? (
                      <form onSubmit={handleSubmit}>
                        <div className="draggable-group">
                          <div>
                            <Input
                              onChange={handleChange}
                              name="title"
                              px="1"
                              size="xs"
                              type="text"
                              bg="white"
                              color="black"
                              defaultValue={selectEdit[0].title}
                            />
                          </div>
                          <div className="edit-delete-btn">
                            <div>
                              <Button
                                colorScheme="green"
                                type="submit"
                                size="xs"
                                variant="outline"
                              >
                                저장
                              </Button>
                            </div>
                            <div onClick={() => setEditIndex(null)}>
                              <Button
                                colorScheme="red"
                                variant="outline"
                                size="xs"
                              >
                                취소
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <li
                        className="draggable-group"
                        style={{
                          backgroundColor:
                            selectedItem === index ? "#0066FF" : "",
                          color: selectedItem === index ? "white" : "",
                        }}
                        onClick={() =>
                          handleClick(index, item.placeToVisitIndex)
                        }
                      >
                        <div>{item.title}</div>
                        <div className="edit-delete-btn">
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
                      </li>
                    )}
                  </div>
                ))}
              </ReactSortable>
            </ul>
          </div>
        </div>
        <div className="drag-parent-lists">
          <div className="draggable-title">
            <div>반</div>
            <div className="add-btn" onClick={() => handleAddChild()}>
              + 추가
            </div>
          </div>
          <div className="draggable-contents">
            <ul>
              <ReactSortable
                list={placeToVisitSecond}
                setList={setPlaceToVisitSecond}
                animation={200}
                delayOnTouchOnly={true}
                delay={2}
              >
                {placeToVisitSecond?.map((item, index) => (
                  <div key={index}>
                    {editSecondIndex === index ? (
                      <form onSubmit={handleSubmit}>
                        <div className="draggable-group">
                          <div>
                            <Input
                              onChange={handleChange}
                              name="title"
                              px="1"
                              size="xs"
                              type="text"
                              bg="white"
                              color="black"
                              defaultValue={selectEdit[0].title}
                            />
                          </div>
                          <div className="edit-delete-btn">
                            <div>
                              <Button
                                colorScheme="green"
                                type="submit"
                                size="xs"
                                variant="outline"
                              >
                                저장
                              </Button>
                            </div>
                            <div onClick={() => setEditSecondIndex(null)}>
                              <Button
                                colorScheme="red"
                                variant="outline"
                                size="xs"
                              >
                                취소
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <li className="draggable-group">
                        <div>{item.title}</div>
                        <div className="edit-delete-btn">
                          <div
                            onClick={() =>
                              handleEditClick(
                                index,
                                item.placeToVisitIndex,
                                "select"
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
                      </li>
                    )}
                  </div>
                ))}
              </ReactSortable>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={handleOrderSave} colorScheme="blue" my="4">
          순서 저장
        </Button>
      </div>
    </div>
  );
}
