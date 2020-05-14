import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, slug }) => {
  const data = useStaticQuery(graphql`
    query Links {
      allDataYaml {
        edges {
          node {
            meta_info {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <header
      className="d-flex justify-content-around pt-3"
      style={{
        // backgroundImage: `url(../images/${slug}_bg.png)`,
        // backgroundRepeat: `repeat`,
        background: `rebeccapurple`
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div>
        {data.allDataYaml && data.allDataYaml.edges.map((node, i) => (
          <div key={i}>
            {true && console.log('node map', node)}
            {/* <Link to={"/" + node.meta_info.slug}> */}
            {node && node.meta && node.meta_info.slug}
            {/* </Link> */}
          </div>
        ))}
      </div>
      {slug && <img src={require(`../images/${slug}_logo.png`)} alt={slug} />}
    </header>
  )
}


Header.propTypes = {
  siteTitle: PropTypes.string,
  logoLink: PropTypes.string
}
Header.defaultProps = {
  siteTitle: ``,
}

export default Header