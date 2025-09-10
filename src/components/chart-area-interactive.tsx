"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Home expenses and property value tracking"

const chartData = [
  { date: "2024-01-01", expenses: 1200, propertyValue: 450000 },
  { date: "2024-01-15", expenses: 800, propertyValue: 452000 },
  { date: "2024-02-01", expenses: 1500, propertyValue: 455000 },
  { date: "2024-02-15", expenses: 900, propertyValue: 458000 },
  { date: "2024-03-01", expenses: 2000, propertyValue: 460000 },
  { date: "2024-03-15", expenses: 1100, propertyValue: 463000 },
  { date: "2024-04-01", expenses: 1800, propertyValue: 465000 },
  { date: "2024-04-15", expenses: 1300, propertyValue: 468000 },
  { date: "2024-05-01", expenses: 2200, propertyValue: 470000 },
  { date: "2024-05-15", expenses: 1600, propertyValue: 472000 },
  { date: "2024-06-01", expenses: 1900, propertyValue: 475000 },
  { date: "2024-06-15", expenses: 1400, propertyValue: 478000 },
  { date: "2024-07-01", expenses: 2100, propertyValue: 480000 },
  { date: "2024-07-15", expenses: 1700, propertyValue: 482000 },
  { date: "2024-08-01", expenses: 2500, propertyValue: 485000 },
  { date: "2024-08-15", expenses: 1200, propertyValue: 487000 },
  { date: "2024-09-01", expenses: 1800, propertyValue: 490000 },
  { date: "2024-09-15", expenses: 1500, propertyValue: 492000 },
  { date: "2024-10-01", expenses: 2000, propertyValue: 495000 },
  { date: "2024-10-15", expenses: 1300, propertyValue: 497000 },
  { date: "2024-11-01", expenses: 1600, propertyValue: 500000 },
  { date: "2024-11-15", expenses: 1900, propertyValue: 502000 },
  { date: "2024-12-01", expenses: 2200, propertyValue: 505000 },
  { date: "2024-12-15", expenses: 1800, propertyValue: 508000 },
]

const chartConfig = {
  expenses: {
    label: "Monthly Expenses",
    color: "hsl(var(--chart-1))",
  },
  propertyValue: {
    label: "Property Value",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("12m")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("6m")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-12-15")
    let monthsToSubtract = 12
    if (timeRange === "6m") {
      monthsToSubtract = 6
    } else if (timeRange === "3m") {
      monthsToSubtract = 3
    }
    const startDate = new Date(referenceDate)
    startDate.setMonth(startDate.getMonth() - monthsToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Home Financial Overview</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Track your home expenses and property value over time
          </span>
          <span className="@[540px]/card:hidden">Financial tracking</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="12m">Last 12 months</ToggleGroupItem>
            <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="3m">Last 3 months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 12 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12m" className="rounded-lg">
                Last 12 months
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="3m" className="rounded-lg">
                Last 3 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPropertyValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-propertyValue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-propertyValue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value, name) => {
                    if (name === "propertyValue") {
                      return [`$${Number(value).toLocaleString()}`, "Property Value"]
                    }
                    return [`$${Number(value).toLocaleString()}`, "Monthly Expenses"]
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
              stackId="a"
            />
            <Area
              dataKey="propertyValue"
              type="natural"
              fill="url(#fillPropertyValue)"
              stroke="var(--color-propertyValue)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}