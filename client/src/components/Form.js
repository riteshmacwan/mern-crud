import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshTrue } from "../utils/RefreshListSlice";
import { useSelector } from "react-redux";
import { removeDetails } from "../utils/DetailsSlice";
import formValidation from "../helpers/formValidation";

export default function Form() {
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.details);
  const formData = {
    name: "",
    email: "",
    address: "",
    b_date: "",
    country: "",
    file: null,
    language: [],
    gender: "",
  };
  const [data, setData] = useState(formData);

  const countries = ["India", "USA", "UK", "Israel"];

  function handleSubmit(event) {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formDataToSend = new FormData();

    formDataToSend.append("name", data.name);
    formDataToSend.append("email", data.email);
    formDataToSend.append("address", data.address);
    formDataToSend.append("country", data.country);
    formDataToSend.append("b_date", data.b_date);
    formDataToSend.append("file", data.file);
    formDataToSend.append("language", data.language);
    formDataToSend.append("gender", data.gender);

    if (Object.keys(editData).length > 0) {
      formDataToSend.append("_id", data._id);

      axios
        .post(`${process.env.REACT_APP_API_URL}/update`, formDataToSend, config)
        .then((res) => {
          alert(res.data.msg);
          dispatch(refreshTrue());
        })
        .catch((err) => {
          alert("Error occurring!");
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/create`, formDataToSend, config)
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
    if (event.target.type === "file") {
      const fileData = event.target.files[0];
      setData({ ...data, [event.target.name]: fileData });
    } else if (event.target.type === "checkbox") {
      const languageData = data.language;
      if (languageData.includes(event.target.name)) {
        const tempArr = languageData.filter(
          (item) => item !== event.target.name
        );
        setData({ ...data, language: tempArr });
      } else {
        let tempArr = [...languageData];
        tempArr.push(event.target.name);
        setData({ ...data, language: tempArr });
      }
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  }

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      setData(editData);
    }
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
          type="email"
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
          value={data.b_date ? data.b_date : ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="b_date"
          type="date"
        />
        <label
          className="block text-gray-700 text-sm font-bold m-2"
          htmlFor="file"
        >
          Select an image
        </label>
        <input
          id="file"
          name="file"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
        />
        <label
          className="block text-gray-700 text-sm font-bold m-2"
          htmlFor="file"
        >
          Select known language
        </label>
        <input
          type="checkbox"
          name="english"
          checked={data.language.includes("english")}
          onChange={handleChange}
        />
        <span className="ml-2 mr-1">English</span>
        <input
          type="checkbox"
          name="hindi"
          checked={data.language.includes("hindi")}
          onChange={handleChange}
        />
        <span className="ml-2 mr-1">Hindi</span>

        <input
          type="checkbox"
          name="gujarati"
          checked={data.language.includes("gujarati")}
          onChange={handleChange}
        />
        <span className="ml-2 mr-1"> Gujarati</span>

        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-2"
          htmlFor="country"
        >
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="country"
        >
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>

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
