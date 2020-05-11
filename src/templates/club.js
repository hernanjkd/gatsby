import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data: { dataYaml } }) => {
    const meta = dataYaml.meta_info

    return (

        <Layout slug={meta.slug}>
            <SEO title={meta.title} />
            <h1>{meta.title}</h1>
            {meta.description && (
                <h3>{meta.description}</h3>
            )}

            {meta.slug &&
                <img src={require(`../images/${meta.slug}_layout.png`)} alt={meta.slug} />}

            <h2>TABLES BREAKDOWN</h2>
            {dataYaml.breakdown.map((e, i) => (
                <div key={i}>
                    {e.section && (
                        <div>{e.section}</div>
                    )}
                    <div>{e.tables}</div>
                    <div>{e.capacity}</div>
                    <ul>
                        {e.includes.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                </div>
            ))}

        </Layout>
    )
}

export const query = graphql`
    query ClubQuery($slug: String!) {
        dataYaml(meta_info: { slug: { eq: $slug }}) {  
            meta_info {
                slug
                title
                date
                location
                description
                djs
            }
            breakdown {
                section
                tables
                capacity
                includes
            }
        }
    }
`
