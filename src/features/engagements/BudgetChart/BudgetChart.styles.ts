import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const ChartSurface = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 320,
  borderRadius: theme.shape.borderRadius,
}));
