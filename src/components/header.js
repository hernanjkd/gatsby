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
      // style={{
      //   backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
      //   backgroundRepeat: 'repeat'
      // }}
      style={{
        backgroundImage: `url(${require(`../images/${slug}_bg.png`)})`,
        backgroundRepeat: `repeat`
        // background: `rebeccapurple`
      }}
    >
      <div>
        <h5 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h5>
      </div>
      <img src={require(`../images/${slug}_logo.png`)} alt={slug} />
      <div>
        {data.allDataYaml && data.allDataYaml.edges.map(({ node }, i) => (
          <div key={i} className="text-light">
            <Link to={"/" + node.meta_info.slug}>
              {node.meta_info.slug}
            </Link>
          </div>
        ))}
      </div>
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