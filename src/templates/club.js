import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data: { dataYaml } }) => {
    const meta = dataYaml.meta_info

    return (

        <Layout>
            <SEO title={meta.title} />
            <h1>{meta.title}</h1>
            {meta.description && (
                <h3>{meta.description}</h3>
            )}
            <h2>TABLES BREAKDOWN</h2>
            {dataYaml.breakdown.map((e, i) => (
                <>
                    {e.section && (
                        <div>{e.section}</div>
                    )}
                    <div>{e.tables}</div>
                    <div>{e.capacity}</div>
                    <ul>
                        {e.includes.map(e => <li>{e}</li>)}
                    </ul>
                </>
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
