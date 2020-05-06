const path = require('path')
const fs = require('fs')
const YAML = require('yaml')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode }) => {
    if (node.internal.type === 'DataYaml') {
        console.log('URL', createFilePath({ node, getNode }))
    }
}

// exports.createPages = async ({ graphql, actions }) => {
//     const { createPage, createRedirect } = actions

//     const relativeFilePath = createFilePath({
//         node,
//         getNode,
//         basePath: "data/faqs/",
//     })

//     const result = await graphql(`
//         {
//             allPageYaml {
//                 edges {
//                     node {
//                         meta_info {
//                             slug
//                             redirects
//                         }
//                         fields{
//                             lang
//                             slug
//                             file_name
//                             template
//                             type
//                             pagePath
//                             filePath
//                         }
//                     }
//                 }
//             }
//         }`
//     );
//     if (result.errors) throw new Error(result.errors)

//     console.log('node', result)

//     createPage({
//         path: 'temp',
//         component: 'src/templates/temp.js',
//         context: {
//             ...node.fields,
//         }
//     });

//     return true
// }