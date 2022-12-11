import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
}

export default function UpdateButton({ text, handleOnClick }: Props) {
  return (
    <Button
    className="update-button"
    variant='contained'
    type="submit"
    onClick={handleOnClick}
    >
      {text}
    </Button>
  )
}
