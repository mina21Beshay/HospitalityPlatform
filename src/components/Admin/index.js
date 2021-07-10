import React from "react";
import {
  Navbar,
  NavbarContainer,
  NavLogo,
  Container,
  FormWrap,
  FormWrapTwo,
  FormWrapThree,
  Icon,
  FormContent,
  Form,
  FormTwo,
  FormH1,
  FormH2,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./AdminElements";
const Admin = () => {
  return (
    <>
      {/* <Navbar>
        <NavbarContainer>
          <NavLogo>Test</NavLogo>
        </NavbarContainer>
      </Navbar> */}
      <Container>
        <FormWrap>
          <Icon to="/">Hotel Knightro</Icon>
        </FormWrap>
        <FormWrapTwo>
          <FormContent>
            <Form action="#"></Form>
          </FormContent>
        </FormWrapTwo>
        <FormWrapThree>
          <FormTwo action="#"></FormTwo>
        </FormWrapThree>
      </Container>
    </>
  );
};

export default Admin;
