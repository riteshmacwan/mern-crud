import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshTrue } from "../utils/RefreshListSlice";
import { addDetails } from "../utils/DetailsSlice";

export default function ListView(props) {
  const dispatch = useDispatch();

  async function handleDelete(id) {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/delete`, { data: { id } })
      .then((res) => {
        alert("Record is deleted!");
        dispatch(refreshTrue());
      })
      .catch((err) => {
        alert("Error occurring!");
      });
  }

  function handleEdit(data) {
    dispatch(addDetails(data));
  }

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={props.key}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.item.name ? props.item.name : "-"}
      </th>
      <td className="px-6 py-4">{props.item.email ? props.item.email : "-"}</td>
      <td className="px-6 py-4">
        {props.item.gender ? props.item.gender : "-"}
      </td>
      <td className="px-6 py-4">
        {props.item.address ? props.item.address : "-"}
      </td>
      <td className="px-6 py-4">
        {props.item.country ? props.item.country : "-"}
      </td>
      <td className="px-6 py-4">
        {props.item.b_date ? props.item.b_date : "-"}
      </td>
      <td className="px-6 py-4">
        {props.item.file ? (
          <img
            src={process.env.REACT_APP_API_URL + "/images/" + props.item.file}
            className="h-20 w-20"
            alt="img.jpg"
          />
        ) : (
          "-"
        )}
      </td>
      <td className="px-6 py-4">
        {props.item.language ? props.item.language.join(",") : "-"}
      </td>
      <td className="px-6 py-4">
        <span>
          <button
            onClick={() => {
              handleEdit(props.item);
            }}
            className="m-2"
          >
            Edit
          </button>
        </span>
        <span>
          <button
            onClick={() => {
              handleDelete(props.item._id);
            }}
            className="text-red-600"
          >
            Delete
          </button>
        </span>
      </td>
    </tr>
  );
}
