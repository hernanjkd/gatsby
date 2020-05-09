import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, logoLink, data }) => (
  <header
    className="d-flex justify-content-around"
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
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
    {logoLink && <img src={require('../images/' + logoLink)} alt={logoLink} />}
  </header>
)

export const query = graphql`
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
`

Header.propTypes = {
  siteTitle: PropTypes.string,
  logoLink: PropTypes.string
}
Header.defaultProps = {
  siteTitle: ``,
}

export default Header