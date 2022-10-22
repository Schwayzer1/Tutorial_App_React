import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import EditTutorial from "./EditTutorial";
import { useState } from "react";

// const tutorials = [
//   {
//     id: 1,
//     title: "JS",
//     description: "JS is a programming language",
//   },
//   {
//     id: 2,
//     title: "React",
//     description: "JS library for UI design",
//   },
// ];
const TutorialList = ({ tutorials, getTutorials }) => {
  const [newItem, setNewItem] = useState([]);

  //! DELETE (CRUD - Delete)
  const deleteTutorial = async (id) => {
    const url = "https://axios-example-cw.herokuapp.com/api/tutorials";
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };
  //! PUT (CRUD - Update)
  //! PUT : whole update, PATCH : partially update
  const editTutorial = async (id, title, description) => {
    const url = "https://axios-example-cw.herokuapp.com/api/tutorials";

    try {
      await axios.put(`${url}/${id}`, { title, description });
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };
  return (
    <div className="container mt-4 task-list">
      <table className="table table-striped">
        <thead>
          <tr className="fw-bolder text-danger">
            <th scope="col">#id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {tutorials?.map((item) => {
            const { id, title, description } = item;
            return (
              <tr key={id} className="fw-bold">
                <th>{id}</th>
                <td>{title}</td>
                <td>{description}</td>
                <td className="text-center text-nowrap">
                  <FaEdit
                    size={20}
                    type="button"
                    className="me-2 text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-modal"
                    onClick={() => setNewItem(item)}
                  />
                  <AiFillDelete
                    size={22}
                    type="button"
                    className="text-danger "
                    onClick={() => deleteTutorial(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditTutorial item={newItem} editTutorial={editTutorial} />
    </div>
  );
};

export default TutorialList;
