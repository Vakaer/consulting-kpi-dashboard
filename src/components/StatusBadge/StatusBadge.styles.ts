import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

export const AtRiskChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));
