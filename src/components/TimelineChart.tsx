import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import type { TimelineEvent } from '@/types/engagement';

interface TimelineChartProps {
  timeline: TimelineEvent[];
}

const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 320,
}));

export function TimelineChart({ timeline }: TimelineChartProps) {
  const data = timeline.map((event, index) => ({
    date: event.date,
    milestone: event.milestone,
    complete: event.complete ? 1 : 0,
    progress: event.complete ? index + 1 : index,
  }));

  return (
    <ChartPaper aria-label="Engagement timeline chart" elevation={1}>
      <Typography component="h2" gutterBottom variant="h6">
        Timeline
      </Typography>
      <ResponsiveContainer height="85%" width="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={value => [value, 'Complete']}
            labelFormatter={label => {
              const match = timeline.find(t => t.date === label);
              return match ? `${label} — ${match.milestone}` : String(label);
            }}
          />
          <Legend />
          <Line
            dataKey="complete"
            name="Complete"
            stroke="#2e7d32"
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartPaper>
  );
}
