import { LoadingButton } from '@mui/lab';

import './Buttons.css';

interface Props {
  text: string
  handleOnClick?: () => void;
  disabled?: boolean
  isLoading: boolean
}

export default function ButtonLoading({ text, handleOnClick, disabled, isLoading }: Props) {
  return (
    <LoadingButton
    className="primary-button"
    variant='contained'
    type="submit"
    onClick={handleOnClick}
    disabled={disabled ? disabled : false}
    loading={isLoading}
    >
      {text}
    </LoadingButton>
  )
}
