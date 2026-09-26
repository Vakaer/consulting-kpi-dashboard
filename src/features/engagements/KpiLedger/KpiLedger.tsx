import type { ReactNode } from 'react';

import { Strip } from './KpiLedger.styles';

interface KpiLedgerProps {
  children: ReactNode;
}

export function KpiLedger({ children }: KpiLedgerProps) {
  return (
    <Strip aria-label="Engagement KPIs" role="region">
      {children}
    </Strip>
  );
}
