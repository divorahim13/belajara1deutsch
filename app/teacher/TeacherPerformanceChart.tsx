"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface PerformanceData {
  chapter: string
  averageScore: number
  completionRate: number
}

interface TeacherPerformanceChartProps {
  data: PerformanceData[]
}

export default function TeacherPerformanceChart({ data }: TeacherPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="chapter" 
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
          dy={10}
        />
        <YAxis 
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
          dx={-10}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
          dx={10}
        />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '4px solid #0f172a',
            borderRadius: '0px',
            boxShadow: '4px 4px 0px 0px rgba(15,23,42,1)',
            fontWeight: 'bold'
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold' }} />
        <Bar 
          yAxisId="left" 
          dataKey="averageScore" 
          name="Average Score (%)" 
          fill="#4f46e5" 
          radius={[4, 4, 0, 0]} 
          barSize={40}
        />
        <Bar 
          yAxisId="right" 
          dataKey="completionRate" 
          name="Completion Rate (%)" 
          fill="#fbbf24" 
          radius={[4, 4, 0, 0]} 
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
