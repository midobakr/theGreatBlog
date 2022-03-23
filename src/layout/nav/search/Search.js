import React, { useState } from "react";
import {
  search1,
  input,
  searchIcon,
  autoComplete,
  list,
  image,
  myLink,
} from "./search.module.css";
import SearchIcon from "./search.png";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

export default function Search() {
  const data = useStaticQuery(graphql`
    query {
      blogs: allMdx {
        nodes {
          id
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")

            image {
              childImageSharp {
                gatsbyImageData(width: 100)
              }
            }
          }
        }
      }
    }
  `);
  const [fullArray, setFullArray] = useState([]);
  function search(e) {
    console.log(data);
    let result = e.target.value;
    if (result === "") {
      setFullArray([]);
      return;
    }
    let tmb_array = data.blogs.nodes.filter((blog) => {
      return blog.frontmatter.title.toLowerCase().match(result.toLowerCase())
        ? blog
        : "";
    });
    if (!tmb_array[0]) {
      tmb_array = [];
    }
    setFullArray(tmb_array);
  }

  return (
    <div className={search1}>
      <div style={{ display: "inline-block", position: "relative" }}>
        <input type="text" className={input} onChange={search}></input>
        <span className={searchIcon}>
          <img src={SearchIcon} alt=""></img>
        </span>
      </div>
      <div className={autoComplete}>
        <ul className={list}>
          {fullArray.map((node) => (
            <Link to={"blog/" + node.id} className={myLink}>
              <li>
                <GatsbyImage
                  className={image}
                  image={getImage(node.frontmatter.image)}
                  alt=""
                />
                <div>
                  <h5>{node.frontmatter.title}</h5>
                  <h6>{node.frontmatter.date}</h6>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
