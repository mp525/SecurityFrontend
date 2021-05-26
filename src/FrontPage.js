import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  CardColumns,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import facade from "./apiFacade";

function FrontPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    facade.fetchAllPosts(setPosts);
  }, []);

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs>
            <Card className="mb-3" bg="secondary" border="light">
              <Card.Body>
                <Card.Title>TODO</Card.Title>
                <Card.Text>
                  Suggestion: Maybe make post vindue her, eller
                  venner/following.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            {/*Dette er posts kolonnen: */}
            <Card className="mb-3" style={{ color: "#000" }} align="center">
              <Card.Header align="center">Post Wall</Card.Header>
              <Card.Body>
                {/* <Card.Title>Post wall</Card.Title> */}
                {posts.list && (
                  <>
                    {posts.list.reverse().map((post) => {
                      return (
                        <div key={post.id}>
                          <Card
                            bg="light"
                            border="success"
                            style={{ width: "40rem" }}
                          >
                            <Card.Title as="h6">
                              Post by {post.user.userName}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted" as="p">
                              {post.posted}
                            </Card.Subtitle>
                            <Card.Body>
                              <Card.Text>{post.content}</Card.Text>
                            </Card.Body>
                          </Card>
                          <br />
                        </div>
                      );
                    })}
                  </>
                )}
              </Card.Body>
              <p>TODO: Whitespace under all posts/blue maybe make prettier.</p>
            </Card>
          </Col>
          <Col xs>
            <Card className="mb-3" bg="secondary" border="light">
              <Card.Body>
                <Card.Title>TODO</Card.Title>
                <Card.Text>
                  Suggestion: Maybe all users in system here?
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FrontPage;
