import "./AllPass.css";

export default function AllPass() {
  return (
    <div className="all-pass">
      <div>
        <input type="checkbox" id="allCheck" />
        <label htmlFor="allCheck">일괄승인</label>
      </div>
    </div>
  );
}
