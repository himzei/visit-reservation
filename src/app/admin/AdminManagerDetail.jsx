import "./AdminManagerDetail.css";
import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import RegIcon3 from "../../assets/svg/person-icon.svg";

export default function AdminManagerDetail() {
  return (
    <div className="admin-manager-detail">
      <section>
        <div className="reg-title">
          <img src={RegIcon1} alt="icon1" />
          <h2>방문객 정보</h2>
        </div>
        <div className="input-group">
          <div>방문객명</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>휴대전화번호</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>차량번호</div>
          <input type="text" />
        </div>
      </section>
      <section>
        <div className="reg-title">
          <img src={RegIcon2} alt="icon2" />
          <h2>방문장소 정보</h2>
        </div>
        <div className="input-group">
          <div>방문지</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>방문 목적</div>
          <input type="text" />
        </div>
        <div className="input-group">
          <div>방문일시</div>
          <input type="text" />
        </div>
      </section>
      <section>
        <div className="reg-title">
          <img src={RegIcon3} alt="icon3" />
          <h2>담당자 선택</h2>
        </div>
        <div className="input-group">
          <div>담당자 선택</div>
          <input type="text" />
        </div>
      </section>
    </div>
  );
}
