import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
}

export default function BuyButton({ text, handleOnClick }: Props) {
  return (
    <Button
    className="buy-button"
    variant="outlined"
    onClick={handleOnClick}
    >
      {text}
    </Button>
  )
}
