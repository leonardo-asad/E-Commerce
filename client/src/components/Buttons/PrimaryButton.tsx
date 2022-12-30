import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
  disabled?: boolean
}

export default function PrimaryButton({ text, handleOnClick, disabled }: Props) {


  return (
    <Button
    className="primary-button"
    variant='contained'
    type="submit"
    onClick={handleOnClick}
    disabled={disabled ? disabled : false}
    >
      {text}
    </Button>
  )
}
