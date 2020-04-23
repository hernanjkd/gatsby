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
                <Divider height="100px" />
                <Title
                    size="5"
                    color={Colors.white}
                    title={yml.banner.tagline}
                    paragraph={yml.banner.sub_heading}
                    main
                    paragraphColor={Colors.white}
                    fontSize="46px"
                    textAlign="center"

                />
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
                            <Column size="1" />
                            <Column size="10">
                                <Row>
                                    <Column size="5" height="300px">
                                        <RoundImage url={yml.intro.image} height="400px" bsize="contain" />
                                    </Column>
                                    <Column size="4">
                                        <Divider height="100px" />
                                        <H5 uppercase align="left" fontSize="20px" fontHeight="30px">{yml.intro.content}</H5>
                                    </Column>
                                </Row>
                            </Column>
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
                <Row align="center">
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={handleClose}
                    ><div style={modalStyle} className={classes.paper}>
                            <Row height="20%" align="center">
                                <Column size="12" align="center"><H4>REVIEW GUIDEBOOK</H4></Column>
                            </Row>
                            <Row height="70%">
                                <Column size="12">
                                    <Row height="30%" align="center">
                                        <Column size="11" >
                                            <Input
                                                type="text" className="form-control" placeholder="First name *"
                                                onChange={(e) => setVal({ ...formData, first_name: e.target.value })}
                                                value={formData.firstName}
                                            />
                                        </Column>
                                    </Row>
                                    <Row height="30%" align="center">
                                        <Column size="11">
                                            <Input type="text" className="form-control" placeholder="Last Name *"
                                                onChange={(e) => setVal({ ...formData, last_name: e.target.value })}
                                                value={formData.lastName}
                                            />
                                        </Column>
                                    </Row>
                                    <Row height="30%" align="center">
                                        <Column size="11">
                                            <Input type="email" className="form-control" placeholder="Email *"
                                                onChange={(e) => setVal({ ...formData, email: e.target.value })}
                                                value={formData.email}
                                            />
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                            <Row height="10%" padding="5px 0 0 0" borderTop={`1px solid ${Colors.blue}`}>

                                <Column size="6" customRespSize respSize="6">
                                    <Paragraph>{formMessage}</Paragraph>
                                </Column>
                                <Column size="3" customRespSize respSize="3" align="right">
                                    {
                                        formData.first_name &&
                                            formData.last_name &&
                                            formData.email ?
                                            <Button width="100%" padding=".2rem .45rem" color={Colors.blue} textColor={Colors.white}
                                                onClick={() => {
                                                    reviewGuidebook(formData)

                                                }}>Submit</Button> : null}
                                </Column>
                                <Column size="3" customRespSize respSize="3" align="right">
                                    <Button outline width="100%" padding=".2rem .45rem" color={Colors.red} textColor={Colors.white} onClick={handleClose}>Close</Button>
                                </Column>
                            </Row>


                        </div>
                    </Modal>
                    <Button outline position="relative" width="300px" onClick={handleOpen} color={Colors.blue}>{yml.payment_guide.button_text}</Button>
                </Row>
                <Divider height="100px" />
            </Wrapper>
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"
            >
                <Divider height="20px" />
                <WhoIsHiring source={yml.ecosystem.partners_name} lang={data.allPartnerYaml.edges} />
                <Divider height="150px" />
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