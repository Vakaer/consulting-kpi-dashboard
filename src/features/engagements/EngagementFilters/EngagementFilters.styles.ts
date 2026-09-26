import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { APP_BAR_HEIGHT } from '@/constants/layout';

export const FilterRow = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: APP_BAR_HEIGHT,
  zIndex: 10,
  backgroundColor: theme.palette.background.default,
}));

export const StatusControl = styled(FormControl)({
  minWidth: 160,
});

export const SearchField = styled(TextField)({
  minWidth: 220,
});
