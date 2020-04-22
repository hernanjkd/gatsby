const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions
}


const createPagesfromYml = async ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions;
    const result = await graphql(`
        {
            allPageYaml {
                edges {
                    node {
                        meta_info {
                            slug
                            redirects
                        }
                        fields{
                            lang
                            slug
                            file_name
                            template
                            type
                            pagePath
                            filePath
                        }
                    }
                }
            }
        }`
    );
    if (result.errors) throw new Error(result.errors);



    return true;
};