import * as React from "react";
import { graphql, Link } from "gatsby";
import Nav from "../layout/nav";
import Catigories from "../layout/Catigories";
import Pagination from "../layout/pagination/Pagination";
// import { StaticImage } from "gatsby-plugin-image";
// import { MDXRenderer } from "gatsby-plugin-mdx";
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
  main,
} from "./index.module.css";

// styles
// markup
const IndexPage = ({ data, pageContext }) => {
  console.log("my data \n", data);

  return (
    <main className={main}>
      <Nav />
      <Catigories activeCategory={pageContext.category} />

      <div style={{ margin: "10px" }}>
        {data.allMdx.nodes.map((node, index) => (
          <Link to={"/blog/" + node.id} className={myLink}>
            <article className={blog} key={node.id}>
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
      <Pagination data={pageContext} />
    </main>
  );
};

export const query = graphql`
  query ($skip: Int = 0, $limit: Int, $filter: MdxFilterInput) {
    allMdx(
      limit: $limit
      skip: $skip
      sort: { fields: frontmatter___date, order: DESC }
      filter: $filter
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          introduction
          image {
            childImageSharp {
              gatsbyImageData(width: 800)
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
