import Button, { ButtonProps } from '@mui/material/Button';

import './Buttons.css';

interface Props extends ButtonProps {
  handleOnClick?: () => void;
}

export default function CustomButton(props: Props) {
  return (
    <Button
    className={props.className}
    variant={props.variant}
    type={props.type}
    onClick={props.handleOnClick}
    startIcon={props.startIcon}
    disabled={props.disabled}
    href={props.href}
    >
      {props.children}
    </Button>
  )
}
