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

function FrontPage() {
  const [posts, setPosts] = [];

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md={2}>
            <Card
              className="mb-3"
              style={{ color: "#000", backgroundColor: "#51c5e5" }}
            >
              <Card.Body>
                <Card.Title>TODO</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={8}> {/*Dette er posts kolonnen: */}
            <Card className="mb-3" style={{ color: "#000" }}>
              <Card.Body>
                <Card.Title>TODO: posts frontpage</Card.Title>
              </Card.Body>
            </Card>
            {/* {posts.map((post)=>{

            })} */}
          </Col>
          <Col>
            <Card
              className="mb-3"
              style={{ color: "#000", backgroundColor: "#51c5e5" }}
            >
              <Card.Body>
                <Card.Title>TODO</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FrontPage;
