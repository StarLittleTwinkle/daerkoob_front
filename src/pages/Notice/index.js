import React, { useEffect, useState } from "react";
import "./index.scss";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
import Pagination from "components/Utils/Pagination";
import NoticeList from "components/List/NoticeList";
import { useHistory } from "react-router-dom";
const Notice = (props) => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [size, setSize] = useState(0);
  const getNotice = async () => {
    const response = await api.get(`notice/inquiry/${page}`);
    setNoticeList(response.data.list);
    setTotalPage(response.data.totalSize);
    setSize(response.data.list.length);
  };
  useEffect(() => {
    getNotice();
  }, [page]);
  const handlePageChange = (num) => {
    setPage(num);
  };

  if (size < 10) {
    if (noticeList) {
      for (let i = size; i < 10; i++) {
        setNoticeList((pervState) => [
          ...pervState,
          { content: "", id: "", registerDate: "", title: "" },
        ]);

        setSize((prev) => prev + 1);
      }
    }
  }
  return (
    <div className="notice">
      <div className="notice__wrapper">
        <div className="noticeList">
          <div className="noticeList__header">
            <h2>공지사항</h2>
          </div>
          <NoticeList data={noticeList} />
        </div>
        <div className="adminButton">
          {currentUser.id === 1 && (
            <button
              onClick={() => {
                history.push(`/noticeAdmin`);
              }}
            >
              관리자용 작성버튼
            </button>
          )}
        </div>
        <div className="pagination">
          <Pagination
            setNumber={handlePageChange}
            total={totalPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default Notice;
