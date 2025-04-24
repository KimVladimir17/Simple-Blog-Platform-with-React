import userImage from "../assets/images/user.png";

export default function User({ userName }) {
  return (
    <div className="user">
      <div className="user__info">
        <h4 className="user__name">{userName}</h4>
        {/* <p>March 5, 2020 </p> */}
      </div>
      <img src={userImage} alt="user"></img>
    </div>
  );
}
