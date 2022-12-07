import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
}

export default function PrimaryButton({ text, handleOnClick }: Props) {
  return (
    <Button
    className="PrimaryButton"
    type="submit"
    onClick={handleOnClick}
    >
      {text}
    </Button>
  )
}
