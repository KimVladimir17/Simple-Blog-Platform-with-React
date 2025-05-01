import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../api/axios-plugin";
import { useNavigate } from "react-router-dom";

const CreateNewArticle = ({ article }) => {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const inputRef = useRef();
  const titleInputRef = useRef();

  const articleData = {
    title: title,
    description: description,
    body: text,
    tagList: tag,
  };

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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setText("");
    setTag([]);
    titleInputRef.current.focus(); //Set focus to the title after submit
  };
  const createNewArticle = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/articles", {
        article: { ...articleData },
      });
      if (response.status === 201) {
        clearForm();
        navigate("/");
      } else {
        console.error("Error creating article:", response.status);
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };
  return (
    <div className="container">
      <form className="article-form" onSubmit={createNewArticle}>
        <div>
          <h3 className="form-title">Create new article</h3>
          <div className="article-form-input">
            <label>Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleInputRef}
            />
          </div>
          <div className="article-form-input">
            <label>Short description</label>
            <input
              type="text"
              className="form-input"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="article-form-input">
            <label>Text</label>
            <textarea
              className="form-input"
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
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

export default CreateNewArticle;
