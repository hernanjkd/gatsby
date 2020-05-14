const path = require('path')

// exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
//     if (node.internal.type === 'DataYaml') {
//         const url = createFilePath({ node, getNode })
//         createNodeField({ node, name: `slug`, value: url });
//     }
// }

exports.createPages = async ({ graphql, actions: { createPage } }) => {

    const result = await graphql(`
        {
            allDataYaml {
                edges {
                    node {
                        meta {
                            slug
                        }
                    }
                }
            }
        }`
    );
    if (result.errors) throw new Error(result.errors)

    result.data.allDataYaml.edges.forEach(({ node }) => {
        const slug = node.meta.slug

        createPage({
            path: slug,
            component: path.resolve(`./src/templates/club.js`),
            context: { slug: slug }
        });
    })

    return true
}