import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
}

export default function PrimaryButton({ text, handleOnClick }: Props) {
  return (
    <Button
    className="primary-button"
    variant='contained'
    type="submit"
    onClick={handleOnClick}
    >
      {text}
    </Button>
  )
}
