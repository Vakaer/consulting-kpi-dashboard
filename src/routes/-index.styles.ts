import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export const KpiSkeletonCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  minHeight: 88,
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const UpdatingLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
})) as typeof Typography;
