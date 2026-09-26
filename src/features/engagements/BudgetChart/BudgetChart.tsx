import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { ChartSurface } from './BudgetChart.styles';

interface BudgetChartProps {
  budget: number;
  actuals: number;
}

export function BudgetChart({ budget, actuals }: BudgetChartProps) {
  const theme = useTheme();
  const data = [{ name: 'Engagement', budget, actuals }];
  const muted = theme.palette.text.secondary;
  const rule = theme.palette.divider;

  return (
    <ChartSurface
      aria-label="Budget versus actuals chart"
      variant="outlined"
    >
      <Typography component="h2" gutterBottom variant="h6">
        Budget vs Actuals
      </Typography>
      <ResponsiveContainer height="85%" width="100%">
        <BarChart data={data}>
          <CartesianGrid
            stroke={rule}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis dataKey="name" tick={{ fill: muted, fontSize: 12 }} />
          <YAxis tick={{ fill: muted, fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill={theme.palette.primary.main} name="Budget" />
          <Bar dataKey="actuals" fill={muted} name="Actuals" />
        </BarChart>
      </ResponsiveContainer>
    </ChartSurface>
  );
}
