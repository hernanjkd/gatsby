/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    const types = ['MarkdownRemark', 'PageYaml', 'CourseYaml', 'LocationYaml', 'JobYaml'];
    // const types = ['MarkdownRemark'];
    if (types.includes(node.internal.type)) {
        const url = createFilePath({ node, getNode })
        const meta = getMetaFromPath({ url, ...node });
        if (meta) {
            createNodeField({ node, name: `lang`, value: meta.lang });
            createNodeField({ node, name: `slug`, value: meta.slug });
            createNodeField({ node, name: `file_name`, value: meta.file_name });
            createNodeField({ node, name: `template`, value: meta.template });
            createNodeField({ node, name: `type`, value: meta.type });
            createNodeField({ node, name: `pagePath`, value: meta.pagePath });
            createNodeField({ node, name: `filePath`, value: url });
            //   createNodeField({ node, name: `ctas`, value: ctas });
        }
    }
};