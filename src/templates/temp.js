import React, { useState } from 'react';
import Layout from '../global/Layout';
import styled, { css } from 'styled-components';
import { Column, Row, Container, Divider, Wrapper } from "../components/Sections";
import { Title, H3, H4, H5, Paragraph } from '../components/Heading';
import { Button, Colors, RoundImage } from '../components/Styling';
import Credentials from '../components/Credentials';
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring';
import BaseRender from './_baseRender';
import { Card } from '../components/Card';
import { reviewGuidebook } from "../actions";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';





const Pricing = (props) => {
    const { data, pageContext, yml } = props;


    return (
        <>
            {/* HEADER SECTION */}
            <Wrapper
                style="default"
                image="yes"
                url={yml.banner.image}
                border="bottom"
                height="500px"
                backgroundSize="cover"
            >


            </Wrapper>
            {/* CREDENTIALS SECTION */}
            <Wrapper
                style="default">
                <Credentials up="80" lang={data.allCredentialsYaml.edges} />
            </Wrapper>
            <Divider height="100px" />
            {/*  */}
            <Container fluid >
                <Row>
                    <Column size="1" />
                    <Column size="11" >
                        <Row>

                        </Row>
                    </Column>
                </Row>
            </Container>
            <Divider height="100px" />
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"

            >
                <Title
                    size="10"
                    title={yml.prices.heading}
                    primary
                />
                <PricesAndPayment type={pageContext.slug} lang={pageContext.lang} />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"

            >
                <Title
                    size="10"
                    title={yml.payment_guide.heading}
                    paragraph={yml.payment_guide.sub_heading}
                    primary
                />
                <Divider height="30px" />

                <Divider height="100px" />
            </Wrapper>


        </ >
    )
};
export const query = graphql`
  query PricingQuery($file_name: String!) {
    allDataYaml(filter: { fields: { file_name: { eq: $file_name } }}) {
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
            payment_guide{
                heading
                sub_heading
                button_text
                button_link
                submit_button_text
                submit_button_link
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
`;
export default BaseRender(Pricing);