import React from "react";
import { Link } from "gatsby";

import { container, list, controller } from "./Pagination.module.css";

export default function Pagination({ data }) {
  console.log("\nnnnnnnnnnn", data.pagesCount);

  const clickController = (i) => {
    window.location.pathname = `/${data.category}/${data.pageNumber + i}`;
  };
  return (
    <div className={container}>
      <h1
        style={{ visibility: data.pageNumber === 1 ? "hidden" : "" }}
        aria-hidden="true"
        onClick={() => {
          clickController(-1);
        }}
        className={controller}
      >
        Previous
      </h1>

      <ul className={list}>
        {Array.from({ length: data.pagesCount }).map((_, i) => (
          <li
            style={
              data.pageNumber === i + 1
                ? { borderBottom: "1px solid white" }
                : {}
            }
          >
            <Link to={`/${data.category}/${i + 1}`}>{i + 1}</Link>
          </li>
        ))}
      </ul>
      <h1
        aria-hidden="true"
        style={{
          visibility: data.pageNumber === data.pagesCount ? "hidden" : "",
        }}
        onClick={() => {
          clickController(1);
        }}
        className={controller}
      >
        Next
      </h1>

      {/* paginatiooooooooooooon */}
    </div>
  );
}
