import { Row, Card, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useAppDispatch } from "../app/hooks";
import { deletePost } from "../features/posts/postsSlice";
import EditModal from "./EditModal";

interface postType {
  _id: string;
  user: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface propsType {
  post: postType;
  user?: any;
}

const PostItem = ({ post, user }: propsType) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(deletePost(post._id));
  };

  const getUpdatedDate = (post: postType) => {
    const lastUpdatedDate = new Date(post.updatedAt);
    return lastUpdatedDate.toLocaleString();
  };

  return (
    <>
      <Row className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="text-muted">
              Last edited at: {getUpdatedDate(post)}
            </Card.Subtitle>

            <Card.Text>{post.body}</Card.Text>

            <div className="d-flex justify-space-between">
              <Button className="me-auto">Read more</Button>

              {post.user === user._id && (
                <>
                  <EditModal id={post._id} />
                  <Button variant="outline-danger" onClick={deleteHandler}>
                    <AiFillDelete />
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
export default PostItem;
