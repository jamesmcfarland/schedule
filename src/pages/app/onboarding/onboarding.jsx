import {
  Button,
  Card,
  CardContent,
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
import { useState } from "react";
import OrganisationDetails from "./organisationDetails";
import TerminologyCard from "./terminology";

const OnboardingFlow = () => {
  const [activeStep, setactiveStep] = useState(0);

  const renderSwitch = () => {
    switch (activeStep) {
      case 0:
        return <OrganisationDetails/>;
      case 1:
        return <Typography>Step two</Typography>;
      case 2:
        return <Typography>Step three</Typography>;
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
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    if (activeStep === 2) {
                      //Do something different here, submit form etc etc.
                      console.log("done");
                    } else setactiveStep((prev) => prev + 1);
                  }}
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
