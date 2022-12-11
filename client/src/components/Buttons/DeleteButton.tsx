import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
}

export default function DeleteButton({ text, handleOnClick }: Props) {
  return (
    <Button
    className="delete-button"
    variant="outlined"
    onClick={handleOnClick}
    >
      {text}
    </Button>
  )
}
