import defaultUserImage from "../assets/images/user.png";

export default function User({ userName, userImage, formattedDate }) {
  return (
    <div className="user">
      <div className="user__info">
        <h4 className="user__name">{userName}</h4>
        <p className="user__date">{formattedDate}</p>
      </div>
      <img
        src={userImage ? userImage : defaultUserImage}
        className="user-image"
        alt="user"
      ></img>
    </div>
  );
}
