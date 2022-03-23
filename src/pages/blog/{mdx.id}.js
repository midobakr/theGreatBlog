import * as React from "react";
import { graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { container, imageContainer, image } from "./index.module.css";
// markup
const IndexPage = ({ data }) => {
  console.log("my data \n");
  return (
    <main className={container}>
      <h1 style={{ textAlign: "center", margin: "30px 0" }}>
        {data.mdx.frontmatter.title}
      </h1>
      <div className={imageContainer}>
        <GatsbyImage
          className={image}
          image={getImage(data.mdx.frontmatter.image)}
          alt=""
        />
      </div>

      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </main>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        image {
          childImageSharp {
            gatsbyImageData(width: 1050)
          }
        }
      }
      body
      id
    }
  }
`;

export default IndexPage;
