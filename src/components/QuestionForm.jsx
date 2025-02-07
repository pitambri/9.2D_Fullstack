import React, { useState, useEffect } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import { db } from '../firebase/firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './QuestionForm.css';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState('');
  const [questions, setQuestions] = useState([]);

  // Fetch questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        const questionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'questions'), {
        title,
        description,
        tags,
        date
      });

      // Clear form fields
      setTitle('');
      setDescription('');
      setTags('');
      setDate('');
      alert('Question posted successfully!');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <>
      <Form className="question-form" onSubmit={handleSubmit}>
        <Form.Field
          control={Input}
          label="Title"
          placeholder="Start your question with how, what, why, etc"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Field
          control={TextArea}
          label="Describe your problem"
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Field
          control={Input}
          label="Tags"
          placeholder="Please add up to 3 tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Form.Field
          control={Input}
          type="date"
          label="Date"
          placeholder="Select date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="button-container">
          <Button size="large" className="post-button" type="submit">
            Post
          </Button>
        </div>
      </Form>

      <div className="questions-list">
        <h3>Previously Posted Questions</h3>
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <h4>{question.title}</h4>
            <p>{question.description}</p>
            <p><strong>Tags:</strong> {question.tags}</p>
            <p><strong>Date:</strong> {question.date}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionForm;