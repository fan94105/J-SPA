import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import Heading from "../../ui/Heading"
import Spinner from "../../ui/Spinner"

import { useServices } from "../service/useServices"

import { desktop, desktopLg } from "../../styles/device"

import { Appointment } from "../../types/global"

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;

  ${desktopLg(css`
    grid-column: 3 / -1;
  `)}

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`

const lightColor = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#a855f7",
]

const darkColor = [
  "#b91c1c",
  "#c2410c",
  "#a16207",
  "#4d7c0f",
  "#15803d",
  "#0f766e",
  "#1d4ed8",
  "#7e22ce",
]

function prepareData(startData: any, appointments: Appointment[] | undefined) {
  function incValue(arr: any, field: any) {
    return arr?.map((obj: any) =>
      obj.id === field ? { ...obj, value: obj.value + 1 } : obj
    )
  }

  const data = appointments
    ?.reduce((acc, cur) => {
      const serviceId = cur.serviceId

      return incValue(acc, serviceId)
    }, startData)
    ?.filter((obj: any) => obj.value > 0)

  return data
}

type ServiceChartProps = {
  appointments: Appointment[] | undefined
}

function ServiceChart({ appointments }: ServiceChartProps) {
  const [isMobile, setIsMobile] = useState(true)

  const color = lightColor

  const { services, isPendingServices } = useServices()

  const startData = services?.map((service, index) => {
    return {
      id: service.id,
      name: service.name,
      value: 0,
      color: color[index % color.length],
    }
  })

  const data = prepareData(startData, appointments)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768)
    })

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 768)
      })
    }
  }, [])

  if (isPendingServices) return <Spinner />

  return (
    <ChartBox>
      <Heading as="h2">服務項目</Heading>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            nameKey="name"
            innerRadius={isMobile ? 40 : 60}
            outerRadius={isMobile ? 60 : 85}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry: any) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.name} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign={isMobile ? "bottom" : "middle"}
            align={isMobile ? "center" : "right"}
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default ServiceChart
