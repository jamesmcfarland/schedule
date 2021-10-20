import { Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const OnboardingFlow = () => {
  return (
    <Box padding="5rem">
      <Stack spacing={2} alignItems="center">
      <Typography variant="h6">Welcome to schedule</Typography>
     <Box  width={700}  >
     <Stepper activeStep={0}>
          <Step key={0}>
              <StepLabel>
                  Organisation details
              </StepLabel>
          </Step>
          <Step key={1}>
              <StepLabel>
                  Departments
              </StepLabel>
          </Step>
          <Step key={2}>
              <StepLabel>
                  Test
              </StepLabel>
          </Step>
      </Stepper>
     </Box>
      </Stack>
    </Box>
  );
};

export default OnboardingFlow;
