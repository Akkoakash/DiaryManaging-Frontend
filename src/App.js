import React, { useState } from 'react';
import Header from './Header';
//import Calendar from 'react-calendar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Style.css';
//import { Route } from '@mui/icons-material';
//import AddIcon from '@mui/icons-material/Add';
import interactionPlugin from "@fullcalendar/interaction"
import { Form, Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import 'jquery/dist/jquery.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Router } from "@mui/icons-material";

function App () {
  
  const calendarRef = React.createRef();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if(form.checkValidity()===true){
      event.preventDefault();
      addEvent(title,date);
      handleClose();
    }

  };

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setDate(new Date().toISOString().split('T')[0]);
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  const titleChange = (event) => {
    setTitle(event.target.value);
  }

  const dateChange = (event) => {
    setDate(event.target.value);
  }

  const addEvent = (title, date) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      title: title,
      start: date
    });
    events.push({ title: title, date: date});
  }

  const events = [{ title: "Today", date: "2022-05-16" },
{ title: " Jai Birthday", date: "2022-05-22"},
{ title: " Rahul Birthday", date: "2022-05-31"},
{ title: " Business Meet", date: "2022-05-25"},
{ title: " Chit Birthday", date: "2022-06-09"},
{ title: " Anniversary", date: "2022-06-04"},
{ title: " Cottage booking", date: "2022-06-06"},
{ title: " Doctor Appointment ", date: "2022-06-11"},
{ title: " Ajay Birthday ", date: "2022-07-01"},
{ title: " Tour start ", date: "2022-08-07"},
{ title: " insurance renewal ", date: "2022-08-22"},
{ title: " Ragu Birthday ", date: "2022-09-25"},
{ title: " Lokesh Birthday ", date: "2022-10-25"},
{ title: " Priya Birthday ", date: "2022-12-02"},
];

  const handleDateClick = (arg) => {
    setDate(arg.dateStr);
    handleShow();
  };

  return(
    <>
      <div>
        <Header/>
        <Button variant="success" onClick={handleShow}>
          Add Event
        </Button>
        <div className='event-calender'>
          <FullCalendar
            ref={calendarRef}
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title" value={title} onChange={titleChange} placeholder="Enter Title" required />
              <Form.Control.Feedback type="invalid">
                Please enter title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={dateChange} required/>
              <Form.Control.Feedback type="invalid">
                Please select date.
              </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>

  );


}


export default App;