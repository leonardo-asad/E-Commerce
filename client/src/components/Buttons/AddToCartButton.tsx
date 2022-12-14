import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
}

export default function AddToCartButton({ text, handleOnClick }: Props) {
  return (
    <Button
    className="addtocart-button"
    variant="contained"
    type="submit"
    onClick={handleOnClick}
    >
      {text}
    </Button>
  )
}
