import React, { useState } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import { db, storage } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ArticleForm.css';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log('Image selected:', e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log('Form submitted with:', { title, abstract, articleText, tags, image });

    try {
      let imageUrl = '';

      // Upload the image if selected
      if (image) {
        console.log('Uploading image...');
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image)
          .then(async () => {
            imageUrl = await getDownloadURL(imageRef);
            console.log('Image uploaded successfully, URL:', imageUrl);
          })
          .catch((uploadError) => {
            console.error('Error uploading image:', uploadError);
            alert('Error uploading image.');
            return; 
          });
      }

      // Save article to Firestore
      console.log('Saving article to Firestore...');
      await addDoc(collection(db, 'articles'), {
        title,
        abstract,
        articleText,
        tags,
        imageUrl: imageUrl || '', 
      });

      console.log('Article saved to Firestore.');

      // Clear form fields
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
      alert('Article posted successfully!');
    } catch (error) {
      console.error('Error posting article:', error.message);  
      alert('Error posting article: ' + error.message);        
    }
  };

  return (
    <>
      <Form className="article-form" onSubmit={handleSubmit}>
        <Form.Field
          control={Input}
          label="Title"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Field
          control={Input}
          label="Abstract"
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
        <Form.Field
          control={TextArea}
          label="Article Text"
          placeholder="Enter your article text"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
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
          label="Upload Image"
          type="file"
          onChange={handleImageChange}
        />
        <div className="button-container">
          <Button size="large" className="post-button" type="submit">
            Post
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ArticleForm;
