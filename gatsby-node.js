const path = require("path");

async function turnBlogsIntoPages(category, { graphql, actions }) {
  const pageTemplate = path.resolve("./src/template/categoryTemplate.js");
  //   ${category}

  if (category === "ALL") {
    var { data } = await graphql(`
      query {
        allMdx {
          totalCount
        }
      }
    `);
  } else {
    var { data } = await graphql(`
    query {
      allMdx(filter: { frontmatter: { category: { eq: "${category}" } } }) {
        totalCount
      }
    }
  `);
  }
  let pagesCount = Math.ceil(data.allMdx.totalCount / 4);
  Array.from({ length: pagesCount }).forEach(async (_, index) => {
    let pathName = `/${index + 1}`;

    await actions.createPage({
      // What is the URL for this new page??
      path: `${category + pathName}`,
      component: pageTemplate,
      context: {
        totalCount: data.allMdx.totalCount,
        pageNumber: index + 1,
        skip: index * 4,
        limit: 4,
        category,
        pagesCount,
        filter:
          category !== "ALL"
            ? { frontmatter: { category: { eq: category } } }
            : {},
      },
    });
  });
}

// async function AllPages(category, { graphql, actions }) {
//   const pageTemplate = path.resolve("./src/template/allTemplate.js");
//   const { data } = await graphql(`
//     query {
//       allMdx {
//         totalCount
//       }
//     }
//   `);
//   let pagesCount = Math.ceil(data.allMdx.totalCount / 4);
//   Array.from({ length: pagesCount }).forEach((_, index) => {
//     let pathName = "/";

//     if (index > 0) {
//       pathName = `/${index + 1}`;
//     }
//     actions.createPage({
//       // What is the URL for this new page??
//       path: pathName,
//       component: pageTemplate,
//       context: {
//         totalCount: data.allMdx.totalCount,
//         pageNumber: index + 1,
//         skip: index * 4,
//         limit: 4,
//         category,
//         pagesCount,
//       },
//     });
//   });
// }

let arr = ["ALL", "ART", "SPORTS", "NEWS"];
exports.createPages = async (params) => {
  // arr.forEach(async (category) => {
  for (let x = 0; x < arr.length; x++) {
    await turnBlogsIntoPages(arr[x], params);
  }
  //   await turnBlogsIntoPages(category, params);
  // });

  // await AllPages("all", params);
};
