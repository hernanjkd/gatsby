import React, { useState } from 'react'
import Layout from "../components/layout"

export default props => {
    const { data, pageContext, yml } = props

    useEffect(() => {
        console.log('props', props)
        console.log('data', data)
        console.log('pageContext', pageContext)
        console.log('yaml', yml)
    }, [])

    return (

        <Layout>
            <h1>Hello World</h1>
        </Layout>
    )
}

export const query = graphql`
  query PricingQuery($id: ID!) {
    allDataYaml(id: { eq: $id }) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
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
    }
  }
`
