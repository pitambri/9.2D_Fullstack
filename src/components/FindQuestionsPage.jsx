import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'semantic-ui-react';
import { db } from '../firebase/firebase'; 
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './FindQuestionsPage.css';

const FindQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleExpand = (id) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, expanded: !q.expanded } : q));
  };

  const filteredQuestions = questions.filter(q => 
    (searchTitle === '' || q.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
    (filterTag === '' || q.tags.toLowerCase().includes(filterTag.toLowerCase())) &&
    (filterDate === '' || q.date === filterDate)
  );

  return (
    <div className="find-questions-page">
      <div className="filter-section">
        <Input
          icon="search"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Input
          placeholder="Filter by tag..."
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="questions-list">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <Card.Content>
              <Card.Header className="card-header">{question.title}</Card.Header>
              {question.expanded && (
                <Card.Description>
                  <p>{question.description}</p> 
                  <p><strong>Tags:</strong> {question.tags}</p> 
                  <p><strong>Date:</strong> {question.date}</p> 
                </Card.Description>
              )}
            </Card.Content>
            <Card.Content extra>
              <Button basic color="red" onClick={() => handleDelete(question.id)}>
                Delete
              </Button>
              <Button basic color="blue" onClick={() => handleExpand(question.id)}>
                {question.expanded ? 'Hide Details' : 'Show Details'}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FindQuestionsPage;
