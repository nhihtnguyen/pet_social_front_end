import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { todoActions, todoSelector } from '../../features/todo/todoSlice';
import {
  Button,
  Form,
  InputGroup,
  ListGroup
} from 'react-bootstrap'

import EventCard from "../../components/eventcard/EventCard";
import NotificationBanner from "../../components/notificationbanner/NotificationBanner";
import Carousel from "../../components/carousel/Carousel";
import ItemDetail from "../../components/itemdetail/ItemDetail";
import { Input } from "../../components/controls";
import { FiSearch } from "react-icons/fi";
import Postcard from "../../components/postcard/Postcard";
import UploadImage from "../../components/uploadimage/UploadImage";

const Todo = () => {
  const dispatch = useAppDispatch();
  const todoData = useAppSelector(todoSelector);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(todoActions.fetchAll());
  }, []);

  const handleAdd = () => {
    dispatch(
      todoActions.addOne({
        name: input,
        status: "planned",
      })
    );
  };
  const handleChangeStatus = (id) => (e) => {
    dispatch(todoActions.changeStatus(id));
  };
  return (
    <>
      <Input
        type='text'
        placeholder='Your name...'
        name=''
        startIcon={<FiSearch />}
      />
      <h1 align="center" style={{ margin: 50 }}>
        Todo list
      </h1>
      <UploadImage />
      <div style={{ display: "flex" }}>
        {todoData.isLoading ? (
          <h5>Loading...</h5>
        ) : (
          <ListGroup
            style={{
              margin: "auto",
              width: 500,
              overflow: "auto",
              maxHeight: 300,
            }}
          >
            <ListGroup.Item>
              <InputGroup>
                <Form.Control
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button variant="primary" onClick={handleAdd}>
                  Add
                </Button>
              </InputGroup>
            </ListGroup.Item>
            {todoData.data
              .map((todo, index) => (
                <ListGroup.Item
                  key={index}
                  variant={todo.status === "planned" ? "" : "success"}
                >
                  <InputGroup>
                    <Form.Check
                      checked={todo.status === "done"}
                      type="checkbox"
                      id={`todo-${index}`}
                      onChange={handleChangeStatus(index)}
                      style={{ marginRight: 10 }}
                    />
                    {todo.status === "planned" ? (
                      <Form.Label htmlFor={`todo-${index}`}>
                        {todo.name}
                      </Form.Label>
                    ) : (
                      <Form.Label
                        htmlFor={`todo-${index}`}
                        style={{ textDecoration: "line-through" }}
                      >
                        {todo.name}
                      </Form.Label>
                    )}
                  </InputGroup>
                </ListGroup.Item>
              ))
              .reverse()}
          </ListGroup>
        )}
      </div>
    </>
  );
};

export default Todo;
