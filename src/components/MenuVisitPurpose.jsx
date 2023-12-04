import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "./MenuVisitPurpose.css";
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
import {
  apiGetPurposeOfVisit,
  apiPurposeOfVisitDelete,
  apiPurposeOfVisitEdit,
} from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useVisitSite from "../hooks/useVisitSite";

export default function MenuVisitPurpose({ lists, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [visitOfPurpose, setVisitOfPurpose] = useState(
    lists?.sort((a, b) => a.itemOrder - b.itemOrder) || []
  );
  const [selectEdit, setSelectEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const queryClient = useQueryClient();

  const { refetch } = useQuery(
    ["getPurposeOfVisit", visitSiteIndex],
    apiGetPurposeOfVisit
  );

  const { mutate } = useMutation(apiPurposeOfVisitEdit, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getPurposeOfVisit");
      if (data.result === 0) {
        setEditIndex(null);
      }
    },
  });
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
  };
  const handleEditClick = (index, purposeOfVisitIndex) => {
    setEditIndex(index);
    const editPurposeOfVisit = lists?.filter(
      (item) => item.purposeOfVisitIndex === purposeOfVisitIndex
    );
    setSelectEdit(editPurposeOfVisit);
    setEditTitle(editPurposeOfVisit[0].title);
    // 방목목적 수정 하는 api 호출
  };

  // 삭제
  const handleDeleteClick = (index) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      apiPurposeOfVisitDelete(index);
      window.location.reload();
    }
  };

  const handleOrderSave = () => {
    visitOfPurpose?.map((item, index) => {
      mutate([
        item.title,
        {
          visitSiteIndex,
          purposeOfVisitIndex: item.purposeOfVisitIndex,
          parentIndex: item.parentIndex,
          itemOrder: index + 1,
        },
      ]);
    });
  };
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
      <div className="setting-draggable-list">
        <div className="draggable-title">
          <div>{title}</div>
          <div className="add-btn" onClick={onOpen}>
            + 추가
          </div>
        </div>
        <div className="draggable-contents">
          <ul>
            <ReactSortable
              list={visitOfPurpose}
              setList={setVisitOfPurpose}
              animation={200}
              delayOnTouchOnly={true}
              delay={2}
            >
              {visitOfPurpose?.map((item, index) => (
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
                    <li className="draggable-group" key={item.id}>
                      <div>{item.title}</div>
                      <div className="edit-delete-btn">
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
                    </li>
                  )}
                </div>
              ))}
            </ReactSortable>
          </ul>
        </div>
      </div>
      <div>
        <Button onClick={handleOrderSave} colorScheme="blue" my="4">
          순서 저장
        </Button>
      </div>
    </>
  );
}
