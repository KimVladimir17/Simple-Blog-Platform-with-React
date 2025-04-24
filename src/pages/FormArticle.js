import { useState, useRef, useEffect } from "react";

const FormArticle = () => {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [tag]);

  const addTagHandler = (e) => {
    e.preventDefault();
    if (newTag.trim() !== "") {
      setTag([...tag, newTag.trim()]);
      setNewTag("");
    }
  };

  const deleteTagHandler = (e) => {
    e.preventDefault();
    const tagIndex = e.target.id;
    setTag((prevTags) => {
      const updatedTags = [...prevTags];
      updatedTags.splice(tagIndex, 1);
      return updatedTags;
    });
  };

  const newTagChangeHandler = (e) => {
    setNewTag(e.target.value);
  };

  const createNewArticle = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <form className="article-form" onSubmit={createNewArticle}>
        <div>
          <h3 className="form-title">Create new article</h3>
          <div className="article-form-input">
            <label>Title</label>
            <input type="text" className="form-input" placeholder="Title" />
          </div>
          <div className="article-form-input">
            <label>Short description</label>
            <input type="text" className="form-input" placeholder="Tilte" />
          </div>
          <div className="article-form-input">
            <label>Text</label>
            <textarea className="form-input" placeholder="Text"></textarea>
          </div>
          <div className="article-form-input">
            <label>Tags</label>
            {tag.map((tag, index) => (
              <div key={index} className="tag-item">
                <div className="form-input form-input-tag">{tag}</div>
                <button
                  type="button"
                  id={index}
                  className="form-tag-btn tag-btn-delete"
                  onClick={deleteTagHandler}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="article-form-tag">
              <input
                type="text"
                className="form-input form-input-tag"
                placeholder="tag"
                value={newTag}
                onChange={newTagChangeHandler}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTagHandler(e);
                  }
                }}
              />
              <button
                type="button"
                className="form-tag-btn tag-btn-add"
                onClick={addTagHandler}
              >
                Add tag
              </button>
            </div>
          </div>
        </div>
        <button className="form-input-btn">Send</button>
      </form>
    </div>
  );
};

export default FormArticle;
