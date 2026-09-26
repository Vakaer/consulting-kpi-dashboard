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
import { useTheme } from '@mui/material/styles';

import { ChartSurface } from './TimelineChart.styles';
import type { TimelineEvent } from '@/types/engagement';

interface TimelineChartProps {
  timeline: TimelineEvent[];
}

export function TimelineChart({ timeline }: TimelineChartProps) {
  const theme = useTheme();
  const muted = theme.palette.text.secondary;
  const rule = theme.palette.divider;
  const data = timeline.map((event, index) => ({
    date: event.date,
    milestone: event.milestone,
    complete: event.complete ? 1 : 0,
    progress: event.complete ? index + 1 : index,
  }));

  return (
    <ChartSurface aria-label="Engagement timeline chart" variant="outlined">
      <Typography component="h2" gutterBottom variant="h6">
        Timeline
      </Typography>
      <ResponsiveContainer height="85%" width="100%">
        <LineChart data={data}>
          <CartesianGrid
            stroke={rule}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis dataKey="date" tick={{ fill: muted, fontSize: 12 }} />
          <YAxis
            allowDecimals={false}
            tick={{ fill: muted, fontSize: 12 }}
          />
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
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartSurface>
  );
}
