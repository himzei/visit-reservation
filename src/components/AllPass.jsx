import "./AllPass.css";

export default function AllPass({ title }) {
  return (
    <div className="all-pass">
      <div>
        <input type="checkbox" id="allCheck" />
        <label htmlFor="allCheck">{title}</label>
      </div>
    </div>
  );
}
