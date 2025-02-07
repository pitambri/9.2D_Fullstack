import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import { db } from '../firebase/firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import './CodePost.css';

const CodePost = () => {
  const [code, setCode] = useState('');
  const [markdown, setMarkdown] = useState('');

  const handlePost = async () => {
    try {
      // Create a new post document in Firestore
      await addDoc(collection(db, 'posts'), {
        code,
        markdown,
        timestamp: new Date(),
      });
      alert("Post submitted successfully!");
      // Clear the inpu t fields after submission
      setCode('');
      setMarkdown('');
    } catch (error) {
      console.error("Error submitting post: ", error);
      alert("Error submitting post. Please try again.");
    }
  };

  return (
    <div className="code-post">
      <h2>Write Your Code</h2>
      <CodeMirror
        value={code}
        options={{ mode: 'javascript', lineNumbers: true }}
        onBeforeChange={(editor, data, value) => setCode(value)}
      />
      <h3>Code Preview</h3>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        {code}
      </pre>
      <h2>Write Your Markdown</h2>
      <textarea
        placeholder="Write your post in markdown..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <h3>Markdown Preview</h3>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <div className="post-button-container">
        <button className="post-button" onClick={handlePost}>Post</button>
      </div>
    </div>
  );
};

export default CodePost;
