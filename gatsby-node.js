const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async (params) =>
    await createBlog(params) &&
    await createPagesfromYml(params) &&
    await createEntityPagesfromYml('Course', params) &&
    await createEntityPagesfromYml('Location', params) &&
    await createEntityPagesfromYml('Job', params) &&
    await addAdditionalRedirects(params) &&
    true;

/*
 *
 *  why is graphql exported at the end of the templates?
 * 
 */

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