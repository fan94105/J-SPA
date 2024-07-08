import styled, { css } from "styled-components"
import { useSearchParams } from "react-router-dom"

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem;
`

const FilterButton = styled.button<{ $active: boolean }>`
  white-space: nowrap;
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

type FilterProps = {
  filterField: string
  options: Record<string, string>[]
}

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value

  const handleClick = (value: string) => {
    searchParams.set(filterField, value)

    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          $active={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}

export default Filter
