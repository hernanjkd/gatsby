const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = params => console.log('pages', params);

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {

    if (node.internal.type === 'DataYaml') {
        createNodeField({ node, name: `xxx`, value: 'crystal' });
        const url = createFilePath({ node, getNode })

        createNodeField({ node, name: `hernan`, value: 'garcia' });
        createNodeField({ node, name: `url`, value: url });

        // createNodeField({ node, name: `slug`, value: meta.slug });
        // createNodeField({ node, name: `file_name`, value: meta.file_name });
        // createNodeField({ node, name: `template`, value: meta.template });
        // createNodeField({ node, name: `type`, value: meta.type });
        // createNodeField({ node, name: `pagePath`, value: meta.pagePath });
        // createNodeField({ node, name: `filePath`, value: url });
        // createNodeField({ node, name: `ctas`, value: ctas });

    }
};

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

    const translations = buildTranslations(result.data[`allPageYaml`]);

    result.data[`allPageYaml`].edges.forEach(({ node }) => {
        const _targetPath = node.fields.slug === "index" ? "/" : node.fields.pagePath;
        console.log(`Creating page ${node.fields.slug === "index" ? "/" : node.fields.pagePath}`);
        createPage({
            path: _targetPath,
            component: path.resolve(`./src/templates/${node.fields.template}.js`),
            context: {
                ...node.fields,
                translations: translations[node.fields.template]
            }
        });

        if (node.fields.lang === "us") {
            console.log(`Redirect from /${node.fields.slug} to ${_targetPath}`);
            createRedirect({
                fromPath: "/" + node.fields.slug,
                toPath: _targetPath,
                redirectInBrowser: true,
                isPermanent: true
            });

            console.log(`Redirect from /en/${node.fields.slug} to ${_targetPath}`);
            createRedirect({
                fromPath: "/en/" + node.fields.slug,
                toPath: _targetPath,
                redirectInBrowser: true,
                isPermanent: true
            });

            if (node.fields.slug === "index") {
                console.log("Redirect from /en to " + _targetPath);
                createRedirect({
                    fromPath: "/en",
                    toPath: _targetPath,
                    redirectInBrowser: true,
                    isPermanent: true
                });
            }
        }
        if (node.fields.lang === "es") {
            console.log(`Redirect from /${node.fields.slug} to ${_targetPath}`);
            createRedirect({
                fromPath: "/" + node.fields.slug,
                toPath: _targetPath,
                redirectInBrowser: true,
                isPermanent: true
            });

        }

        if (node.meta_info && node.meta_info.redirects) {
            node.meta_info.redirects.forEach(path => {
                if (typeof (path) !== "string") {
                    throw new Error(`The path in ${node.meta_info.slug} its not a string: ${path}`);
                }
                path = path[0] !== '/' ? '/' + path : path;
                createRedirect({
                    fromPath: path,
                    toPath: _targetPath,
                    redirectInBrowser: true,
                    isPermanent: true
                });
            })
            if (node.meta_info && node.meta_info.redirects) {
                node.meta_info.redirects.forEach(path => {
                    if (typeof (path) !== "string") {
                        throw new Error(`The path in ${node.meta_info.slug} its not a string: ${path}`);
                    }
                    path = path[0] !== '/' ? '/' + path : path;
                    createRedirect({
                        fromPath: path,
                        toPath: _targetPath,
                        redirectInBrowser: true,
                        isPermanent: true
                    });
                })
            }
        });

    return true;
};