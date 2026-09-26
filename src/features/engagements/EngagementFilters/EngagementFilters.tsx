import { useEffect, useRef, useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import type {
  EngagementFilters as Filters,
  EngagementStatus,
} from '@/types/engagement';
import {
  FilterRow,
  SearchField,
  StatusControl,
} from './EngagementFilters.styles';

interface EngagementFiltersProps {
  value: Filters;
  onChange: (next: Filters) => void;
}

const DEBOUNCE_MS = 250;

export function EngagementFilters({ value, onChange }: EngagementFiltersProps) {
  const [searchDraft, setSearchDraft] = useState(value.search ?? '');
  const [prevSearch, setPrevSearch] = useState(value.search);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);

  if (value.search !== prevSearch) {
    setPrevSearch(value.search);
    setSearchDraft(value.search ?? '');
  }

  useEffect(() => {
    if (searchDraft === (valueRef.current.search ?? '')) return;
    const handle = window.setTimeout(() => {
      onChangeRef.current({ ...valueRef.current, search: searchDraft });
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [searchDraft]);

  return (
    <FilterRow onSubmit={e => e.preventDefault()}>
      <SearchField
        label="Search"
        onChange={e => setSearchDraft(e.target.value)}
        size="small"
        slotProps={{
          htmlInput: { 'aria-label': 'Search engagements' },
        }}
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
