import RegIcon3 from "../assets/svg/person-icon.svg";

export default function SelectManager({ data }) {
  return (
    <section>
      <form>
        <div className="reg-title">
          <img src={RegIcon3} alt="icon3" />
          <h2>담당자 선택</h2>
        </div>

        <div className="input-group">
          <div>이름</div>
          <input type="text" defaultValue={data?.managers[0]?.name} />
        </div>
        <div className="input-group">
          <div>직책</div>
          <input type="text" defaultValue={data?.managers[0]?.position} />
        </div>
      </form>
    </section>
  );
}
