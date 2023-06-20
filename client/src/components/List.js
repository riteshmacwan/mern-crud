import React, { useEffect, useState } from "react";
import axios from "axios";
import ListView from "./ListView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { refreshFalse } from "../utils/RefreshListSlice";

export default function List() {
  const dispatch = useDispatch();
  const [listData, setListData] = useState();
  console.log(listData);
  const refresh = useSelector((state) => state.refreshList);

  function refreshList() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/index`)
      .then((res) => {
        setListData(res.data.data);
        dispatch(refreshFalse());
      })
      .catch((err) => {
        alert("Error occurring!");
      });
  }

  if (refresh) {
    refreshList();
  }

  useEffect(function () {
    refreshList();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              First name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Birth date
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Languages
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {listData
            ? listData.map((item, key) => {
                return <ListView item={item} key={key} />;
              })
            : "not found"}
        </tbody>
      </table>
    </div>
  );
}
