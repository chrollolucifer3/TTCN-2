import React, { useEffect } from "react";
import { Modal, List, Divider, Skeleton } from "antd";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import nodata from "assets/images/user/nodata.jpg";

function ModalList({ isModalOpen, title, onClose, data }) {
  useEffect(() => {
    // Xử lý logic nếu cần khi modal mở
  }, [isModalOpen]);

  return (
    <Modal open={isModalOpen} footer={false} closable={true} onCancel={onClose}>
      <h2>{title}</h2>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length} // Số lượng dữ liệu đã hiển thị
          next={() => {}} // Không thực hiện tải thêm
          hasMore={false} // Không còn dữ liệu để tải
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />} // Loader tạm thời, không thực sự cần thiết
          endMessage={<Divider plain>No more data 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={150}
                    height={100}
                    alt="logo"
                    src={item.image_url ? item.image_url : nodata}
                  />
                }
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.description || ""}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Modal>
  );
}

ModalList.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default ModalList;
