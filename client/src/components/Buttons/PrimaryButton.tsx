import Button from '@mui/material/Button';

import './Buttons.css';

interface Props {
  text: string
}

export default function PrimaryButton({ text }: Props) {
  return (
    <Button
    className="PrimaryButton"
    type="submit"
    >
      {text}
    </Button>
  )
}
