import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshTrue } from "../utils/RefreshListSlice";
import { useSelector } from "react-redux";
import { removeDetails } from "../utils/DetailsSlice";

export default function Form() {
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.details);

  const [data, setData] = useState(editData);

  const countries = ["India", "USA", "UK", "Israel"];

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.keys(editData).length > 0) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/update`, data)
        .then((res) => {
          console.log(res);
          alert(res.data.msg);
          dispatch(refreshTrue());
        })
        .catch((err) => {
          alert("Error occurring!");
        });
    } else {
      console.log(data);
      axios
        .post(`${process.env.REACT_APP_API_URL}/create`, data)
        .then((res) => {
          alert(res.data.msg);
          dispatch(refreshTrue());
        })
        .catch((err) => {
          alert("Error occurring!");
        });
    }
  }

  function handleInsertNew() {
    window.location.reload();
  }

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    setData(editData);
    console.log(data);
  }, [editData]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          First name
        </label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="First Name"
        />
        <label
          className="block text-gray-700 text-sm font-bold m-2"
          htmlFor="username"
        >
          Email
        </label>
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
        />

        <label
          className="block text-gray-700 text-sm font-bold m-2"
          htmlFor="username"
        >
          Address
        </label>
        <textarea
          name="address"
          value={data.address}
          rows="4"
          cols="30"
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Address"
        ></textarea>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="country"
        >
          Country
        </label>
        <select
          name="country"
          value={data.country}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="country"
        >
          <option value="">Please select your country</option>
          {countries.map((country, index) => {
            return <option key={index}>{country}</option>;
          })}
        </select>

        <label
          className="block text-gray-700 text-sm font-bold m-2"
          htmlFor="b_date"
        >
          Birth date
        </label>
        <input
          name="b_date"
          value={data.b_date}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="b_date"
          type="date"
        />

        <div className="mt-5 items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {Object.keys(editData).length > 0 ? "Update" : "Submit"}
          </button>

          {Object.keys(editData).length > 0 ? (
            <button
              onClick={handleInsertNew}
              className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Insert new
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
