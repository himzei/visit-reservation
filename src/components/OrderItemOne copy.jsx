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
import { useForm } from "react-hook-form";

export default function OrderItemOne({ lists, title }) {
  const [editIndex, setEditIndex] = useState(null);
  const [selectEdit, setSelectEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setPlaceVisitIndex } = useContext(VisitSiteContext);
  const [items, setItems] = useState(lists);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemRefs = useRef([]);
  const addRefs = useRef();

  const { register, handleSubmit } = useForm();
  const handleEditClick = (index, purposeOfVisitIndex) => {
    setEditIndex(index);
    const editPurposeOfVisit = items?.filter(
      (item) => item.purposeOfVisitIndex === purposeOfVisitIndex
    );
    setSelectEdit(editPurposeOfVisit);

    // console.log(editPurposeOfVisit);
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

  const onSubmit = (data) => {};

  return (
    <>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>방문목적 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPurposeOfVisit />
          </ModalBody>
          {/* <ModalFooter>
            <Button width="100px" onClick={onClose}>
              닫기
            </Button>
            <Button
              width="100px"
              height="35px"
              color="white"
              bg="#0066FF"
              _hover={{ bg: "#0053CF" }}
              mx="2"
            >
              저장
            </Button>
          </ModalFooter> */}
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
              {items?.map((item, index) => (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div>
                          <Input
                            name="title"
                            px="1"
                            size="xs"
                            type="text"
                            w="140px"
                            bg="white"
                            color="black"
                            defaultValue={item.title}
                          />
                        </div>
                        <div className="edit-delete__btn">
                          <div>
                            <Button type="submit" size="xs">
                              수정
                            </Button>
                          </div>
                          <div onClick={() => setEditIndex(null)}>
                            <Button size="xs">삭제</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
