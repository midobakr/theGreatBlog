import * as React from "react";
import { graphql, Link } from "gatsby";
import Nav from "../layout/nav";
import Catigories from "../layout/Catigories";
// import Pagination from "../layout/pagination/Pagination";
import "./main.css";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import {
  blog,
  Image,
  introduction,
  box,
  box2,
  title,
  myLink,
  date,
} from "./index.module.css";

// styles
// markup
const IndexPage = ({ data }) => {
  console.log("my data \n", data);

  return (
    <main>
      <Nav />
      <Catigories />

      <div style={{ margin: "10px" }}>
        {data.allMdx.nodes.map((node) => (
          <Link to={"blog/" + node.id} key={node.id} className={myLink}>
            <article className={blog}>
              <div className={box}>
                <GatsbyImage
                  className={Image}
                  image={getImage(node.frontmatter.image)}
                  alt=""
                />
              </div>
              <div className={box2}>
                <h2 className={title}>{node.frontmatter.title}</h2>

                <p className={introduction}>{node.frontmatter.introduction}</p>
                <p className={date}>Posted: {node.frontmatter.date}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 4) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          introduction
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
        body
        id
        slug
      }
    }
  }
`;

export default IndexPage;
