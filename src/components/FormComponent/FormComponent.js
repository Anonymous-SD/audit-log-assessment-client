import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faX } from "@fortawesome/free-solid-svg-icons";
import "./FormComponent.scss";
import {useParams} from "react-router-dom";

const FormComponent = () => {
  const [siteInfo, setSiteInfo] = useState({
    siteId: "",
    siteName: "",
    addressLine: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [auditLogs, setAuditLogs] = useState([]);

  const {id = 1} = useParams();

  const [siteId, setSiteId] = useState(id);

  useEffect(() => {
    getSiteInfo();
  }, [siteId]);

  const getSiteInfo = async () => {
    await fetch(
      `https://dx3nqhzxy4.execute-api.ca-central-1.amazonaws.com/dev/site/${siteId}`,

      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (response) => {
        const data = await response.json();

        if (data.status === "success") {

          if(Object.keys(data.data.siteData).length > 0){
            setSiteDetails(data.data.siteData);

          }

          setAuditLogs(data.data.siteLogs);
          

          console.log("success");
        } else {
        }
      })
      .catch((error) => {});
  };

  const setSiteDetails = (details) => {
    const { siteId, siteName, addressLine, description, latitude, longitude } =
      details;

    setSiteInfo({
      ...siteInfo,
      siteId,
      siteName,
      addressLine,
      description,
      latitude,
      longitude,
    });
  };

  const saveSiteInfo = async () => {
    await fetch(
      `https://dx3nqhzxy4.execute-api.ca-central-1.amazonaws.com/dev/site`,

      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteInfo),
      }
    )
      .then(async (response) => {
        const data = await response.json();

        if (data.status === "success") {

          alert('data saved successfully.');
          console.log("success");
        } else {
          alert('there was a problem saving data.');
          console.log("failed");
        }
      })
      .catch((error) => {
        console.log("failed");
        alert('there was a problem saving data.');
      });
  };


  const handleChange = (event) => {
    event.preventDefault();

    setSiteInfo({ ...siteInfo, [event.target.name]: event.target.value });
  };

  const handleCancel = (event) => {
    event.preventDefault();

    console.log("cancel!");
  };

  const handleSave = (event) => {
    event.preventDefault();

    saveSiteInfo();

    console.log("save!");
  };

  return (
    <>
      <Container className="d-flex vh-100">
        <Row className="m-auto align-self-center">
          <Col>
            <Card className="px-4 py-4">
              <Row className="justify-content-left mb-2 pb-3  border-bottom">
                <Col className="col-md-3 col-sm-3 py-1">
                  <Button
                    className="form-button-save btn bg-transparent btn-outline-primary"
                    onClick={handleSave}
                  >
                    <FontAwesomeIcon icon={faSave} /> SAVE
                  </Button>
                </Col>
                <Col className="col-md-4 col-sm-4 py-1">
                  <Button
                    className="form-button btn bg-transparent btn-outline-dark"
                    onClick={handleCancel}
                  >
                    <FontAwesomeIcon icon={faX} /> CANCEL
                  </Button>
                </Col>
              </Row>

              <Row className="justify-content-md-left mb-3 pb-1">
                <Col className="py-1">Site Id: {siteInfo.siteId}</Col>
              </Row>

              <Form.Group className="mb-3" controlId="siteName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  name="siteName"
                  value={siteInfo.siteName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="addressLine">
                <Form.Label>Jurisdiction/City/Region</Form.Label>
                <Form.Control
                  placeholder="Jurisdiction/City/Region"
                  name="addressLine"
                  value={siteInfo.addressLine}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Site Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={siteInfo.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="latitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    value={siteInfo.latitude}
                    name="latitude"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="longitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    value={siteInfo.longitude}
                    name="longitude"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col>
                  <Card>
                    <Card.Header>Audit Log</Card.Header>
                    <Card.Body className="overflow-auto vh-20">
  
                        {auditLogs.map((item, index) => {
                          return (
                            <div key={index} className="row">
                            <div  className="col">         
                              {item.eventType} {" on "} 
                              {new Date(item.date).toLocaleString()}{" "}
                             
                           </div>
                           </div>
                          );
                        })}
                     
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormComponent;
