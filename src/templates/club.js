import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default props => {

    useEffect(() => {
        console.clear()
        console.log('props', props)
        console.log('pageContext', props.pageContext)
        console.log('data', props.data)
    }, [props])

    return (

        <Layout>
            <SEO title="Page two" />
            <h1>Hi from the second page</h1>
            <p>Welcome to page 2</p>
        </Layout>
    )
}

export const query = graphql`
    query PricingQuery($slug: String!) {
        dataYaml(fields: { slug: { eq: $slug }}) {  
            meta_info{
                title
                description
            }
            banner{
                tagline
                image
                sub_heading
            }
            intro{
                image
                content
            }
            prices{
                heading
            }
            ecosystem{
                heading
                sub_heading
                partners_name
            }
        }
    }
`
