import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import OrganisationDetails from "./organisationDetails";
import TerminologyCard from "./terminology";
import { countries } from "../../../utils/countries";
import Departments from "./departments";

import { v4 as uuidv4 } from "uuid";
import Overview from "./overview";
import { useOrg } from "../../../contexts/OrgContext";
import { useHistory } from "react-router";

const OnboardingFlow = () => {
  const { addNewOrg } = useOrg();
  const history = useHistory();
  const [activeStep, setactiveStep] = useState(0);
  //We need to keep the formik state available as the pages are mounted and unmounted, so we will define them here
  const [orgCountry, setorgCountry] = useState(
    countries.filter((country) => country.label === "United Kingdom")[0]
  );

  const [organisationDetailsState, setorganisationDetailsState] = useState({
    orgName: "RPRS ",
    orgAddrLine1: "28 annadale park",
    orgAddrLine2: "",
    orgCity: "limavady",
    orgPostCode: "bt499bw",
    orgPhoneContact: "7724819082",
  });

  const [departments, setdepartments] = useState([
    {
      name: "Default Department",
      id: uuidv4(),
    },
  ]);

  const [canContinue, setcanContinue] = useState(false);

  const handleStep = () => {
    if (activeStep === 2) {
      //Do something different here, submit form etc etc.
      console.log("done");
      addNewOrg(organisationDetailsState, departments, orgCountry).then(()=>{
        history.push("/app");
      })
    } else setactiveStep((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("UE", organisationDetailsState);
  }, [organisationDetailsState]);

  const renderSwitch = () => {
    switch (activeStep) {
      case 0:
        return (
          <OrganisationDetails
            setorganisationDetailsState={setorganisationDetailsState}
            organisationDetailsState={organisationDetailsState}
            orgCountry={orgCountry}
            setOrgCountry={setorgCountry}
            setcanContinue={setcanContinue}
          />
        );
      case 1:
        return (
          <Departments
            setcanContinue={setcanContinue}
            setdepartments={setdepartments}
            departments={departments}
          />
        );
      case 2:
        return (
          <Overview
            organisationDetailsState={organisationDetailsState}
            setCanContinue={setcanContinue}
            departments={departments}
          />
        );
      case 3:
        return <Typography>Step four</Typography>;
    }
  };

  return (
    <Container sx={{ minWidth: "95vw" }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <TerminologyCard />
        </Grid>

        <Grid item xs={8}>
          <Grid
            container
            padding="5rem"
            direction="column"
            spacing={4}
            sx={{ minHeight: "90vh" }}
          >
            <Grid item xs={2}>
              <Stack spacing={2} alignItems="center">
                <Typography variant="h5">Welcome to schedule</Typography>
                <Box width={700}>
                  <Stepper activeStep={activeStep}>
                    <Step key={0}>
                      <StepLabel>Organisation details</StepLabel>
                    </Step>
                    <Step key={1}>
                      <StepLabel>Departments</StepLabel>
                    </Step>
                    <Step key={2}>
                      <StepLabel>Test</StepLabel>
                    </Step>
                  </Stepper>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={8} sx={{ minHeight: "60vh" }}>
              {renderSwitch()}
            </Grid>

            <Grid item xs={2}>
              <Stack
                spacing={10}
                direction="row"
                alignItems="center"
                justifyContent="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Button
                  disabled={activeStep === 0}
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={() => setactiveStep((prev) => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  disabled={!canContinue}
                  sx={{ textTransform: "none" }}
                  onClick={handleStep}
                >
                  {activeStep === 2 ? "Finish" : "Next"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          {/* {No content} */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OnboardingFlow;
