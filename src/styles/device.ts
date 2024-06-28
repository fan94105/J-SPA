import { RuleSet, css } from "styled-components"

const size = {
  tablet: "600px",
  laptop: "768px",
  desktop: "1024px",
}

export const tablet = (inner: RuleSet<object>) => css`
  @media (min-width: ${size.tablet}) {
    ${inner};
  }
`

export const laptop = (inner: RuleSet<object>) => css`
  @media (min-width: ${size.laptop}) {
    ${inner};
  }
`

export const desktop = (inner: RuleSet<object>) => css`
  @media (min-width: ${size.desktop}) {
    ${inner};
  }
`
