import React from "react";
import Search from "./search/Search";
import { container, container2, title } from "./index.module.css";

export default function Nav() {
  return (
    <div className={container}>
      <div className={container2}>
        <h4>Author </h4>
        <h1 className={title}>The Awsome Blogger</h1>
        <h4>
          <Search />
        </h4>
      </div>
    </div>
  );
}
