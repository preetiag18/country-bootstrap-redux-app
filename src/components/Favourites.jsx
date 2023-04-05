import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import {
  clearFavourites,
  removeFavourites,
} from "../features/countries/favouritesSlice";
import { Button } from "react-bootstrap";

const Favourites = () => {
  const dispatch = useDispatch();
  const favouritesList = useSelector((state) => state.favourites.favourites);
  let countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  if (favouritesList !== null) {
    countriesList = countriesList.filter(
      (c) =>
        favouritesList.filter((favCoun) => favCoun === c.name.common).length
    );
  } else {
    countriesList = [];
  }

  // We will be replacing this with data from our API.
  if (!loading && countriesList.length) {
    return (
      <Container fluid>
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: "18rem" }}
                type="search"
                className="me-2 "
                placeholder="Search for countries"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} className="g-3">
          <Button
            onClick={() => {
              dispatch(clearFavourites());
            }}
          >
            Clear all
          </Button>
        </Row>
        <Row xs={2} md={3} lg={4} className="g-3">
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
                  <Card className="h-100">
                    <i
                      className="bi bi-heart-fill text-danger m-1 p-1"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(removeFavourites(country.name.common));
                      }}
                    ></i>
                    <Card.Body className="d-flex flex-column">
                      <Card.Img
                        variant="top"
                        src={country.flags.png}
                        height="200px"
                        width="60px"
                      />

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
                          {country.population.toLocaleString(
                            country.population
                          )}
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
  } else {
    return <h4> No favourite country found</h4>;
  }
};

export default Favourites;
