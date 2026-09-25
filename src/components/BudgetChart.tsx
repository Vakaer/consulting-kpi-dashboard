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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface BudgetChartProps {
  budget: number;
  actuals: number;
}

const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 320,
}));

export function BudgetChart({ budget, actuals }: BudgetChartProps) {
  const data = [{ name: 'Engagement', budget, actuals }];

  return (
    <ChartPaper aria-label="Budget versus actuals chart" elevation={1}>
      <Typography component="h2" gutterBottom variant="h6">
        Budget vs Actuals
      </Typography>
      <ResponsiveContainer height="85%" width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#1565c0" name="Budget" />
          <Bar dataKey="actuals" fill="#ef6c00" name="Actuals" />
        </BarChart>
      </ResponsiveContainer>
    </ChartPaper>
  );
}
