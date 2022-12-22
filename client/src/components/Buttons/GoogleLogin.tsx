import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

import './Buttons.css';


export default function GoogleLoginButton() {
  const route = `${process.env.REACT_APP_API_URL}/users/login/google`

  return (
    <Button
    className="google-button"
    variant='contained'
    startIcon={<GoogleIcon />}
    href={route}
    >
      Login with Google
    </Button>
  )
}
