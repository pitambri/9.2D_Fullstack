import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import CodePost from './CodePost';
import './NewPostPage.css';

const NewPostPage = () => {
    const [postType, setPostType] = useState('');

    const handlePostTypeChange = (event) => {
        setPostType(event.target.value);
    };

    return (
        <div className="new-post-container">
            <div className="post-header-container">
                <h1 className="post-heading">New Post</h1>

                {!postType && (
                    <div className="post-type-selection">
                        <p className="post-type-message">Select Post Type:</p>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="question"
                                    checked={postType === 'question'}
                                    onChange={handlePostTypeChange}
                                />
                                <span className="radio-text">Question</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="article"
                                    checked={postType === 'article'}
                                    onChange={handlePostTypeChange}
                                />
                                <span className="radio-text">Article</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="code"
                                    checked={postType === 'code'}
                                    onChange={handlePostTypeChange}
                                />
                                <span className="radio-text">Code</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {postType && (
                <div className="post-section">
                    <h2>{postType === 'question' ? 'Ask a Question' : postType === 'article' ? 'Share an Article' : 'Post Your Code'}</h2>
                    {postType === 'question' ? (
                        <QuestionForm />
                    ) : postType === 'article' ? (
                        <ArticleForm />
                    ) : (
                        <CodePost />
                    )}
                </div>
            )}
        </div>
    );
};

export default NewPostPage;
