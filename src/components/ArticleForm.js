import { useContext, useEffect, useRef, useState } from "react";
import articlesService from "../service/articles/articlesService";
import { AuthContext } from "../contexts/AuthContext";

const ArticleForm = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagError, setTagError] = useState("");
  const [inputError, setInputError] = useState([]);

  const inputRef = useRef();
  const titleInputRef = useRef();

  const { userName } = useContext(AuthContext);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  useEffect(() => {
    setTitle(initialValues?.title || "");
    setDescription(initialValues?.description || "");
    setText(initialValues?.body || "");
    setTag(initialValues?.tagList || []);
  }, [initialValues]);

  const addTagHandler = (e) => {
    e.preventDefault();
    const trimmedTag = newTag.trim().toLowerCase();

    if (trimmedTag === "") return;
    if (tag.includes(trimmedTag)) {
      setTagError(`"${trimmedTag} is already there"`);
    } else {
      setTag([...tag, trimmedTag]);
      setTagError("");
    }
    setNewTag("");
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
    setTagError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    const trimmed = title.trim();
    const cleaned = trimmed.replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s]/g, "");
    if (trimmed === "" || !cleaned) errors.title = "Title is required";
    if (description.trim() === "")
      errors.description = "Description is required";
    if (text.trim() === "") errors.body = "Text is required";
    setInputError(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }

    const isUnique = await articlesService.isTitleUnique(
      title.toLocaleLowerCase(),
      initialValues?.slug
    );
    if (!isUnique) {
      setInputError((prev) => ({ ...prev, title: "Title is already taken." }));
      return;
    }
    onSubmit({ title, description, body: text, tagList: tag });
  };

  return (
    <div className="container">
      <form className="article-form" onSubmit={handleSubmit}>
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
            {inputError && <p className="error-message">{inputError.title}</p>}
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
            {inputError && (
              <p className="error-message">{inputError.description}</p>
            )}
          </div>
          <div className="article-form-input">
            <label>Text</label>
            <textarea
              className="form-input"
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {inputError && <p className="error-message">{inputError.body}</p>}
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
                placeholder={tagError || "tag"}
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

export default ArticleForm;
