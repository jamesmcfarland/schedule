import { Alert, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthIndicator = ({
  password,
  onStrengthChange,
  strength,
  ...rest
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordScoreFriendly = [
    "terrible",
    "bad",
    "mediocre",
    "good",
    "great",
  ];
  const passwordScoreAlertLevel = [
    "error",
    "error",
    "warning",
    "info",
    "success",
  ];

  useEffect(() => {
    setPasswordStrength(zxcvbn(password).score);
    onStrengthChange(passwordStrength);
  
  }, [password]);
  return (
    <>
     {password && <LinearProgress
        variant="determinate"
        value={passwordStrength * 25}
        color={passwordScoreAlertLevel[passwordStrength]}
      />}
     {password &&  <Alert severity={passwordScoreAlertLevel[passwordStrength]}>
        that password is {passwordScoreFriendly[passwordStrength]}!
      </Alert>}
    </>
  );
};

export default PasswordStrengthIndicator;

//https://upmostly.com/tutorials/build-a-password-strength-meter-react
