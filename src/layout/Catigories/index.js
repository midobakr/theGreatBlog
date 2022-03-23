import React from "react";
import { Link } from "gatsby";
import { container, list } from "./Catigories.module.css";
let arr = ["ALL", "ART", "SPORTS", "NEWS"];

export default function Catigories({ activeCategory }) {
  return (
    <div className={container}>
      <ul className={list}>
        {arr.map((name) => (
          <Link style={{ width: "100%" }} to={`/${name}/1`}>
            <li
              style={
                activeCategory === name
                  ? { color: "white", fontSize: "1.5em" }
                  : {}
              }
            >
              <div>{name}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
