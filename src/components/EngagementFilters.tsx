import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';

import type {
  EngagementFilters as Filters,
  EngagementStatus,
} from '@/types/engagement';

interface EngagementFiltersProps {
  value: Filters;
  onChange: (next: Filters) => void;
}

const FilterRow = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StatusControl = styled(FormControl)({
  minWidth: 160,
});

const DEBOUNCE_MS = 250;

export function EngagementFilters({ value, onChange }: EngagementFiltersProps) {
  const [searchDraft, setSearchDraft] = useState(value.search ?? '');
  const [prevSearch, setPrevSearch] = useState(value.search);

  if (value.search !== prevSearch) {
    setPrevSearch(value.search);
    setSearchDraft(value.search ?? '');
  }

  useEffect(() => {
    if (searchDraft === (value.search ?? '')) return;
    const handle = window.setTimeout(() => {
      onChange({ ...value, search: searchDraft });
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
    // Intentionally omit `value`/`onChange` identity: debounce only on draft text.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce searchDraft only
  }, [searchDraft]);

  return (
    <FilterRow onSubmit={e => e.preventDefault()}>
      <TextField
        label="Search"
        onChange={e => setSearchDraft(e.target.value)}
        size="small"
        slotProps={{
          htmlInput: { 'aria-label': 'Search engagements' },
        }}
        sx={{ minWidth: 220 }}
        value={searchDraft}
      />
      <StatusControl size="small">
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          label="Status"
          labelId="status-filter-label"
          onChange={e => {
            const v = e.target.value as EngagementStatus | 'all' | '';
            onChange({
              ...value,
              status: !v || v === 'all' ? 'all' : v,
            });
          }}
          value={value.status && value.status !== 'all' ? value.status : 'all'}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="at_risk">At Risk</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </StatusControl>
    </FilterRow>
  );
}
