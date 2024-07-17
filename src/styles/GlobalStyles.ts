import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  

  --image-grayscale: 0;
  --image-opacity: 100%;
  }
  
  &.dark-mode {
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }
  
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-100);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;

  border: none;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

abbr[title] {
    text-decoration: none;
}

  img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }

  /* navbar */
  .show-icon{
    transform: rotate(90deg);
  }

  /* slick */
  .slick-prev {
    left: -20px;
    z-index: 999;
  }
  .slick-next {
    right: 0;
  }
  .slick-prev:before, .slick-next:before{
    font-size: 4rem;
    color: var(--color-grey-700);
  }

  // react-calendar
  .react-calendar {
    width: 100%;
    max-width: 60rem;
    padding: 0.8rem;
    margin: 0 auto;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  }

  .react-calendar__navigation button:disabled {
    background: none;
    color: var(--color-grey-400);
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 1rem;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
  }

  .react-calendar__tile--now:enabled:hover, 
  .react-calendar__tile--now:enabled:focus,
  .react-calendar__tile:enabled:hover, 
  .react-calendar__tile:enabled:focus {
    background: var(--color-brand-100);
  }

  .react-calendar__tile {
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    margin-bottom: 0.6rem;

    &--now {
      background: transparent;
      color: var(--color-brand-600);
    }

    &--active {
      background: var(--color-brand-600) !important;
      color: var(--color-grey-0) !important;
    }
  }

  .react-calendar__month-view__days__day--weekend {
    color: currentColor;
  }

  .react-calendar__month-view__days__day--neighboringMonth, 
  .react-calendar__decade-view__years__year--neighboringDecade, 
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .selected {
    background: var(--color-brand-600) !important;
    color: var(--color-grey-0) !important;
  }
`

export default GlobalStyles
