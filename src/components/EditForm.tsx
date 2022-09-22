import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";

const PostForm = ({ id }: any) => {
  const [Post, setPost] = useState({
    title: "",
    body: "",
  });

  const { title, body } = Post;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPost({
      title: "",
      body: "",
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Post Title"
            name="title"
            value={title}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Post Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            placeholder="Post Body"
            name="body"
            value={body}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default PostForm;
