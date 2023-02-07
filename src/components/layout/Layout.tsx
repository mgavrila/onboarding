import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <>
      <Grid
        templateAreas={`"header header" "nav main" "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"200px 1fr"}
        h="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          Header
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          Nav
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          {children}
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
