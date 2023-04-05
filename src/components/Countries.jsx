import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  addFavourites,
  removeFavourites,
} from "../features/countries/favouritesSlice";

const Countries = () => {
  const dispatch = useDispatch();
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2 "
              placeholder="Search country"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((c) => {
            return c.name.common.toLowerCase().includes(search.toLowerCase());
          })
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ selectedCountry: country }}
              >
                <Card className="h-100" border="primary">
                  {favouritesList.includes(country.name.common) ? (
                    <i
                      className="bi bi-heart-fill text-danger m-1 p-1"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(removeFavourites(country.name.common));
                      }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-heart text-danger m-1 p-1"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(addFavourites(country.name.common));
                      }}
                    ></i>
                  )}
                  <Card.Img
                    variant="top"
                    src={country.flags.png}
                    height="200px"
                    width="60px"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.name.official}
                    </Card.Subtitle>
                    <ListGroup
                      variant="flush"
                      className="flex-grow-1 justify-content-end"
                    >
                      <ListGroup.Item>
                        <i className="bi bi-translate me-2"></i>
                        {Object.values(country.languages || {})}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2"></i>
                        {country.currencies
                          ? Object.values(country.currencies || {})
                              .map((currency) => currency.name)
                              .join(",")
                          : "--"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <i className="bi bi-people me-2"></i>
                        {country.population.toLocaleString(country.population)}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
