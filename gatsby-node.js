const path = require('path')
const fs = require('fs')
const YAML = require('yaml')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type === 'DataYaml') {
        const url = createFilePath({ node, getNode })
        createNodeField({ node, name: `slug`, value: url });
    }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {

    const result = await graphql(`
        {
            allDataYaml {
                edges {
                    node {
                        meta_info {
                            slug
                            title
                            description
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }`
    );
    if (result.errors) throw new Error(result.errors)

    result.data.allDataYaml.edges.forEach(({ node }) => {
        const slug = node.fields.slug

        createPage({
            path: slug,
            component: path.resolve(`./src/templates/club.js`),
            context: {
                slug: slug,
                ...node,
            }
        });
    })

    return true
}