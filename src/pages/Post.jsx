
import { useState } from "react";
import "./Post.css";
//function component to display the post form
function Post() {
    // Stores the selected post type.
    const [postType, setPostType] = useState("question");

    // Stores question form data.
    const [question, setQuestion] = useState({
        title: "",
        description: "",
        tags: ""
    });

    // Stores article form data.
    const [article, setArticle] = useState({
        title: "",
        abstract: "",
        content: "",
        tags: ""
    });

    // Stores popup information.
    const [modal, setModal] = useState({
        isOpen: false,
        type: "success",
        title: "",
        messages: []
    });

    // Check which post type is selected.
    const isQuestion = postType === "question";
    

    // Get data from the selected form.
    //if postType is question then get question data else get article data
    const data = isQuestion ? question : article;

    // Update form fields when the user types.
    function handleChange(e) {
        const { name, value } = e.target;

        if (isQuestion) {
            // Keep other question fields unchanged.
            //spread operator(...) is used to copy the existing properties of the state object
            setQuestion({ ...question, [name]: value });
        } else {
            // Keep other article fields unchanged.
            //spread operator (...) is used to copy the existing properties of the state object
            setArticle({ ...article, [name]: value });
        }
    }

    function handleSubmit(e) {
        // Stop the page from refreshing.
        e.preventDefault();

        // Store validation errors.
        const errors = [];

        // Split tags by commas and remove extra spaces.
        const tags = data.tags
            .split(",")
            //map function is used to apply the trim function to each element of the array
            .map(tag => tag.trim())
            //filter function is used to remove empty strings from the array
            .filter(tag => tag);

        

            
            
        // Check the title.
        if (!data.title.trim()) {
            errors.push("Title is required.");
        } else if (data.title.trim().length < 5) {
            errors.push("Title must be at least 5 characters long.");
        }

        // Check the question description.
        if (isQuestion && !question.description.trim()) {
            errors.push("Please describe your problem.");
        }

        // Check the article abstract.
        if (!isQuestion && !article.abstract.trim()) {
            errors.push("Please enter an abstract.");
        }

        // Check the article content.
        if (!isQuestion && !article.content.trim()) {
            errors.push("Please enter the article content.");
        }

        // Require at least one tag and allow up to three.
        if (tags.length === 0) {
            errors.push("Please add at least one tag.");
        } else if (tags.length > 3) {
            errors.push("You can add a maximum of 3 tags.");
        }

        // Show errors if the form is invalid.
        if (errors.length > 0) {
            setModal({
                isOpen: true,
                type: "error",
                title: "Post Submission Failed",
                messages: errors
            });

            return;
        }

        // Show a success message if the form is valid.
        setModal({
            isOpen: true,
            type: "success",
            title: "Post Sent Successfully!",
            messages: [
                `Your ${postType} "${data.title.trim()}" has been ${
                    isQuestion ? "posted" : "published"
                } successfully.`
            ]
        });

        // Clear the submitted form.
        if (isQuestion) {
            setQuestion({ title: "", description: "", tags: "" });
        } else {
            setArticle({ title: "", abstract: "", content: "", tags: "" });
        }
    }

    // Display the form.
    return (
        <div className="post-page-wrapper">
            <div className="post-container">
                <div className="post-header-bar">New Post</div>

                {/* Let the user select a question or article. */}
                <div className="post-type-selector">
                    <span className="selector-label">Select Post Type:</span>

                    <label className="radio-option">
                        <input
                            type="radio"
                            checked={isQuestion}
                            onChange={() => setPostType("question")}
                        />
                        <span>Question</span>
                    </label>

                    <label className="radio-option">
                        <input
                            type="radio"
                            checked={!isQuestion}
                            onChange={() => setPostType("article")}
                        />
                        <span>Article</span>
                    </label>
                </div>

                <div className="post-header-bar">
                    What do you want to ask or share
                </div>

                <p className="post-hint-text">
                    {isQuestion
                        ? "For a question, fill in the details below."
                        : "For an article, fill in the details below."}
                </p>

                <form onSubmit={handleSubmit} className="post-form">
                    <div className="conditional-fields">
                        <div className="form-row">
                            <label htmlFor="title" className="field-label">
                                Title
                            </label>

                            <input
                                id="title"
                                name="title"
                                className="text-input"
                                placeholder="Enter a title"
                                value={data.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Show fields according to the selected post type. */}
                        {isQuestion ? (
                            <div className="form-column">
                                <label htmlFor="description" className="field-label">
                                    Describe your problem
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    rows="10"
                                    className="textarea-input"
                                    placeholder="Explain your problem and what you have tried..."
                                    value={question.description}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="form-column">
                                    <label htmlFor="abstract" className="field-label">
                                        Abstract
                                    </label>

                                    <textarea
                                        id="abstract"
                                        name="abstract"
                                        rows="3"
                                        className="textarea-input"
                                        placeholder="Enter an abstract"
                                        value={article.abstract}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-column">
                                    <label htmlFor="content" className="field-label">
                                        Article Text
                                    </label>

                                    <textarea
                                        id="content"
                                        name="content"
                                        rows="10"
                                        className="textarea-input"
                                        placeholder="Enter your article"
                                        value={article.content}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        <div className="form-row">
                            <label htmlFor="tags" className="field-label">
                                Tags
                            </label>

                            <input
                                id="tags"
                                name="tags"
                                className="text-input"
                                placeholder="Add up to 3 tags, separated by commas"
                                value={data.tags}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="post-actions">
                        <button type="submit" className="post-btn">
                            Post
                        </button>
                    </div>
                </form>
            </div>

            {/* Show the popup only when it is open. */}
            {modal.isOpen && (
                <div
                    className="modal-overlay"
                    onClick={() =>
                        setModal({ ...modal, isOpen: false })
                    }
                >
                    <div
                        className={`modal-dialog ${
                            modal.type === "error"
                                ? "modal-error"
                                : "modal-success"
                        }`}
                        // Prevent clicks inside the popup from closing it.
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <span className="modal-icon">
                                {modal.type === "error" ? "!" : "✓"}
                            </span>

                            <h3>{modal.title}</h3>
                        </div>

                        <div className="modal-body">
                            {/* Display all errors or the success message. */}
                            {modal.messages.map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="modal-btn"
                                onClick={() =>
                                    setModal({ ...modal, isOpen: false })
                                }
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
