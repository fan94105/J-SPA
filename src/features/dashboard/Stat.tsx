import styled from "styled-components"

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 1.6rem;

  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`

const Icon = styled.div<{ $color: string }>`
  grid-row: 1 / -1;

  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--color-${({ $color }) => $color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;

    color: var(--color-${({ $color }) => $color}-700);
  }
`

const Title = styled.div`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`

const Value = styled.div`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
`

type StatProps = {
  title: string
  value: any
  color: string
  icon: React.ReactNode
}

function Stat({ title, value, color, icon }: StatProps) {
  return (
    <StyledStat>
      <Icon $color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  )
}

export default Stat
