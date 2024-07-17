// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import styled, { css } from "styled-components"
// import {
//   HiOutlineArrowRightEndOnRectangle,
//   HiOutlineArrowRightOnRectangle,
//   HiOutlineBars3BottomRight,
//   HiOutlineBookmarkSquare,
//   HiOutlineCalendarDays,
//   HiOutlineCog6Tooth,
//   HiOutlineRocketLaunch,
//   HiOutlineSparkles,
//   HiOutlineSquaresPlus,
//   HiOutlineUser,
//   HiOutlineUsers,
//   HiOutlineXMark,
// } from "react-icons/hi2"

// import ButtonIcon from "./ButtonIcon"

// import { useOutsideClick } from "../hooks/useOutsideClick"
// import { useLiff } from "../context/LiffContext"
// import { useUser } from "../features/authentication/useUser"
// import { useLogout } from "../features/authentication/useLogout"
// import { clearSessionFormData } from "../utils/helpers"

// import { tablet } from "../styles/device"

// const StyledHeader = styled.header`
//   width: 100%;
//   background-color: var(--color-grey-200);
//   padding: 1.4rem 4rem;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   position: fixed;
//   top: 0;
//   z-index: 999;
// `

// const StyledNav = styled.nav<{
//   $isNavOpen: boolean
// }>`
//   ${(props) =>
//     props.$isNavOpen
//       ? css`
//           opacity: 1;
//           transform: translateX(0);
//         `
//       : css`
//           opacity: 0;
//           transform: translateX(100%);
//         `}

//   height: 100dvh;
//   background-color: var(--color-grey-0);

//   transition: all 350ms ease-out;

//   position: fixed;
//   inset: 0 0 0 20%;

//   ${tablet(css`
//     opacity: 1;
//     transform: translateX(0);
//     height: 100%;
//     position: relative;
//     inset: unset;

//     display: flex;
//     justify-content: space-between
//     align-items: center;

//     background-color: var(--color-grey-200);
//   `)}
// `

// const StyledUserInfo = styled.div`
//   padding: 1.6rem 4rem 1.1rem;
//   border-bottom: 1px solid var(--color-grey-300);

//   display: flex;
//   align-items: center;
//   gap: 0.8rem;

//   ${tablet(css`
//     border-bottom: none;
//     border-left: 1px solid var(--color-grey-300);
//     padding: 0 0 0 1.2rem;
//     order: 2;
//   `)}
// `

// const StyledUserImg = styled.div`
//   width: 3rem;
//   height: 3rem;
//   border: 1px solid var(--color-grey-300);
//   border-radius: 50%;
//   overflow: hidden;

//   img {
//     display: block;
//     object-fit: cover;
//     object-position: center;
//   }
// `

// const StyledUserName = styled.div`
//   color: var(--color-grey-700);
//   font-size: 1.6rem;
//   font-weight: 500;
//   line-height: 2.4rem;
// `

// const StyledList = styled.ul`
//   color: var(--color-grey-700);

//   padding: 2.4rem 4rem;

//   display: flex;
//   flex-direction: column;
//   gap: 1rem;

//   position: relative;

//   ${tablet(css`
//     flex-direction: row;
//     padding: 0;
//     background-color: transparent;
//   `)}

//   & a {
//     background-color: transparent;
//     border: none;
//     padding: 0.4rem 1rem;
//     border-radius: var(--border-radius-sm);
//     cursor: pointer;

//     display: flex;
//     align-items: center;

//     &:hover {
//       background-color: var(--color-grey-100);

//       svg {
//         color: var(--color-brand-600);
//       }
//     }
//   }

//   & svg {
//     width: 2.2rem;
//     height: 2.2rem;
//     color: var(--color-grey-500);

//     margin-right: 1rem;
//   }
// `

// const StyledBtn = styled.button`
//   background-color: transparent;
//   border: none;
//   padding: 0.4rem 1rem;
//   border-radius: var(--border-radius-sm);
//   cursor: pointer;

//   display: flex;
//   align-items: center;

//   &:hover {
//     background-color: var(--color-grey-100);

//     svg {
//       color: var(--color-brand-600);
//     }
//   }
// `

// const StyledToggleBtn = styled.div`
//   position: relative;

//   ${tablet(css`
//     display: none;
//   `)}
// `

// function Navbar() {
//   const [isNavOpen, setIsNavOpen] = useState(false)

//   const { isLoggedIn, profile, login, logout } = useLiff()

//   const { isAuthenticated } = useUser()

//   const { authLogout, isPendingLogout } = useLogout()

//   const ref = useOutsideClick(() => setIsNavOpen(false))

//   const navigate = useNavigate()

//   const handleToggleNav = () => {
//     setIsNavOpen((isNavOpen) => !isNavOpen)
//   }

//   const handleChangeUrl = () => {
//     clearSessionFormData()

//     setIsNavOpen(false)
//   }

//   const handleLogin = () => {
//     login?.()
//   }

//   const handleLogout = () => {
//     if (isAuthenticated) {
//       authLogout?.()
//     }

//     logout?.()

//     sessionStorage.clear()

//     setIsNavOpen(false)

//     navigate("/", { replace: true })
//   }

//   useEffect(() => {
//     if (isNavOpen) {
//       document.body.style.overflow = "hidden"
//     }

//     return () => {
//       document.body.style.overflow = ""
//     }
//   }, [isNavOpen])

//   return (
//     <StyledHeader ref={ref}>
//       <Link to="/" onClick={() => setIsNavOpen(false)}>
//         <div>J~SPA</div>
//       </Link>

//       <StyledNav $isNavOpen={isNavOpen}>
//         <StyledUserInfo>
//           <StyledUserImg>
//             {isLoggedIn && profile ? (
//               <img
//                 src={profile.pictureUrl}
//                 alt={`${profile.displayName} 的頭像`}
//               />
//             ) : null}
//           </StyledUserImg>
//           <StyledUserName>
//             {isLoggedIn && profile ? profile.displayName : "未登入"}
//           </StyledUserName>
//         </StyledUserInfo>

//         <StyledList>
//           {isLoggedIn && (
//             <>
//               <li>
//                 <Link to="appointment" onClick={handleChangeUrl}>
//                   <HiOutlineCalendarDays />
//                   <span>線上預約</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="appointments" onClick={handleChangeUrl}>
//                   <HiOutlineUser />
//                   <span>我的預約</span>
//                 </Link>
//               </li>
//             </>
//           )}

//           {isLoggedIn && !isAuthenticated && (
//             <li>
//               <Link to="login" onClick={handleChangeUrl}>
//                 <HiOutlineCog6Tooth />
//                 <span>管理員登入</span>
//               </Link>
//             </li>
//           )}

//           {isAuthenticated && (
//             <>
//               <li>
//                 <Link to="dashboard" onClick={handleChangeUrl}>
//                   <HiOutlineSquaresPlus />
//                   <span>總覽</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="dashboard/appointments" onClick={handleChangeUrl}>
//                   <HiOutlineBookmarkSquare />
//                   <span>全部預約</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="dashboard/services" onClick={handleChangeUrl}>
//                   <HiOutlineRocketLaunch />
//                   <span>全部服務</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="dashboard/options" onClick={handleChangeUrl}>
//                   <HiOutlineSparkles />
//                   <span>全部加選</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="dashboard/settings" onClick={handleChangeUrl}>
//                   <HiOutlineCog6Tooth />
//                   <span>設定</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="dashboard/users" onClick={handleChangeUrl}>
//                   <HiOutlineUsers />
//                   <span>新增管理員</span>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="dashboard/account" onClick={handleChangeUrl}>
//                   <HiOutlineUser />
//                   <span>帳號設定</span>
//                 </Link>
//               </li>
//             </>
//           )}

//           {!isLoggedIn && (
//             <li>
//               <StyledBtn onClick={handleLogin}>
//                 <HiOutlineArrowRightEndOnRectangle />
//                 <span>登入</span>
//               </StyledBtn>
//             </li>
//           )}

//           {isLoggedIn && (
//             <li>
//               <StyledBtn onClick={handleLogout}>
//                 <HiOutlineArrowRightOnRectangle />
//                 <span>登出</span>
//               </StyledBtn>
//             </li>
//           )}
//         </StyledList>
//       </StyledNav>

//       <StyledToggleBtn>
//         <ButtonIcon onClick={handleToggleNav}>
//           {isNavOpen ? <HiOutlineXMark /> : <HiOutlineBars3BottomRight />}
//         </ButtonIcon>
//       </StyledToggleBtn>
//     </StyledHeader>
//   )
// }

// export default Navbar

import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import {
  HiBars3,
  HiChevronDown,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBookmarkSquare,
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineLockClosed,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  HiOutlineSquaresPlus,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2"
import { Link, useNavigate } from "react-router-dom"

import { useOutsideClick } from "../hooks/useOutsideClick"
import { useLiff } from "../context/LiffContext"
import { useUser } from "../features/authentication/useUser"
import { useLogout } from "../features/authentication/useLogout"

import { laptop } from "../styles/device"

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  z-index: 100;
`

const StyledNavbar = styled.nav`
  padding-inline: 1.5rem;
  height: 4.2rem;

  ${laptop(css`
    height: 6.2rem;
  `)}
`

const StyledData = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLogo = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${laptop(css`
    position: static;
    transform: translateX(0);
  `)}
`

// const StyledProfile = styled.div`
//   height: 100%;
//   padding: 1rem 0;

//   display: flex;
// `

/*========== Toggle ==========*/
const StyledToggle = styled.div<{ $isNavOpen: boolean }>`
  position: relative;
  width: 3.2rem;
  height: 3.2rem;

  transition: transform 0.4s;

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--color-grey-500);
    cursor: pointer;

    transition: opacity 0.1s;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${laptop(css`
    display: none;
  `)}
`

const StyledOpen = styled.div<{ $isNavOpen: boolean }>`
  & svg {
    opacity: ${({ $isNavOpen }) => ($isNavOpen ? 0 : 1)};
  }
`

const StyledClose = styled.div<{ $isNavOpen: boolean }>`
  & svg {
    opacity: ${({ $isNavOpen }) => ($isNavOpen ? 1 : 0)};
  }
`

/*========== Profile Dropdown ==========*/
const StyledProfileDropdownContainer = styled.div`
  height: 100%;
  padding-block: 1rem;

  position: relative;

  & input {
    display: none;
  }

  & input:checked ~ ul {
    opacity: 1;
    transform: initial;
    pointer-events: initial;
  }

  & input:checked ~ label .profile-dropdown-arrow {
    opacity: 0;
  }

  & input:checked ~ label .profile-dropdown-close {
    opacity: 1;
  }
`

const StyledProfileLoginBtn = styled.button`
  height: 100%;
  padding: 0 1.6rem;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
`

const StyledProfileDropdown = styled.div`
  height: 100%;

  cursor: pointer;

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  & span {
    display: none;
    font-weight: 600;
  }

  ${laptop(css`
    padding: 0 1.6rem;
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-200);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);

    & span {
      display: inline;
    }
  `)}

  &:focus + ul {
    opacity: 1;
    transform: initial;
    pointer-events: initial;
  }
`

const StyledProfileImg = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  overflow: hidden;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const StyledIcons = styled.div`
  display: none;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  position: relative;

  & svg {
    width: 100%;
    height: 100%;
    color: var(--color-grey-500);

    position: absolute;
    top: 0;
    left: 0;

    transition: opacity 0.1s, transform 0.4s;
  }

  .profile-dropdown-close {
    opacity: 0;
  }

  ${laptop(css`
    display: block;
  `)}
`

const StyledProfileDropdownMenu = styled.ul`
  width: max-content;
  border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  pointer-events: none;
  opacity: 0;

  position: absolute;
  top: 4.2rem;
  right: 0;
  transform: scale(0.1);
  transform-origin: 12.2rem -3rem;

  transition: opacity 0.4s, transform 0.4s;

  &:focus-within {
    opacity: 1;
    transform: initial;
    pointer-events: initial;
  }

  ${laptop(css`
    top: 6.2rem;
  `)}
`

const StyledProfileDropdownLink = styled(Link)`
  font-weight: 600;
  padding: 1.25rem 3.5rem 1.25rem 1rem;
  background-color: var(--color-grey-0);

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  & svg {
    width: 2rem;
    height: 2rem;
    font-weight: initial;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`

const StyledProfileDropdownBtn = styled.button`
  width: 100%;
  font-weight: 600;
  padding: 1.25rem 3.5rem 1.25rem 1rem;
  background-color: var(--color-grey-0);

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  & svg {
    width: 2rem;
    height: 2rem;
    font-weight: initial;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`

/*========== Menu ==========*/
const StyledMenu = styled.div<{ $isNavOpen: boolean }>`
  width: 100%;
  height: calc(100vh - 4.2rem);
  overflow: auto;
  backdrop-filter: blur(5px);

  position: absolute;
  top: ${({ $isNavOpen }) => ($isNavOpen ? "4.2rem" : "3.2rem")};
  left: 0;
  pointer-events: ${({ $isNavOpen }) => ($isNavOpen ? "initial" : "none")};
  opacity: ${({ $isNavOpen }) => ($isNavOpen ? 1 : 0)};

  transition: top 0.4s, opacity 0.3s;

  &::state(webkit-scrollbar) {
    width: 0;
  }

  ${laptop(css`
    width: auto;
    height: 100%;
    top: 0;
    right: 35%;
    left: unset;
    pointer-events: initial;
    opacity: 1;
    overflow: initial;
  `)}
`

const StyledList = styled.ul`
  background-color: var(--color-grey-50);
  padding-top: 1rem;

  ${laptop(css`
    height: 100%;
    display: flex;
    column-gap: 3rem;
    padding-block: 1rem;
  `)}
`

const StyledBaseLink = css`
  color: var(--color-grey-600);
  font-weight: 600;
  padding: 1.25rem 1.5rem;
  transition: background-color 0.3s;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover,
  &:focus-within {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  ${laptop(css`
    height: 100%;
    padding: 0;
    justify-content: initial;
    column-gap: 0.25rem;

    &:hover,
    &:focus-within {
      background-color: transparent;
    }
  `)}
`

const StyledLink = styled(Link)`
  ${StyledBaseLink}
`

// const StyledBtnLink = styled.button`
//   ${StyledBaseLink}
//   width: 100%;
//   background-color: transparent;
// `

/*========== Dropdown Menu ==========*/
const StyledDropdownItem = styled.li`
  cursor: pointer;

  & .dropdown-toggle1:checked ~ ul,
  & .dropdown-toggle2:checked ~ ul {
    max-height: 1000px;

    transition: max-height 0.4s ease-in;
  }

  & .dropdown-toggle1:checked ~ label svg,
  & .dropdown-toggle2:checked ~ label svg {
    transform: rotate(180deg);
  }

  @media (hover: hover) {
    &:hover ul,
    &:focus-within ul {
      max-height: 1000px;

      transition: max-height 0.4s ease-in;
    }

    &:hover label svg,
    &:focus-within label svg {
      transform: rotate(-180deg);
    }
  }

  & input {
    display: none;
    pointer-events: none;
  }

  ${laptop(css`
    position: relative;
  `)}
`

const StyledLabelLink = styled.label`
  ${StyledBaseLink}

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    font-weight: initial;

    transition: transform 0.4s;
  }
`

const StyledDropdownMenu = styled.ul`
  max-height: 0;
  overflow: hidden;

  transition: max-height 0.4s ease-out;

  ${laptop(css`
    width: max-content;
    border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);

    position: absolute;
    top: 5.2rem;
    left: 0;
  `)}
`

// const StyledUserDropdownMenu = styled(StyledDropdownMenu)`
//   ${laptop(css`
//     left: unset;
//     right: -1.5rem;
//   `)}
// `

const StyledDropdownLink = styled(StyledProfileDropdownLink)`
  padding: 1.25rem 1.25rem 1.25rem 4.5rem;

  ${laptop(css`
    padding-inline: 1rem 3.5rem;
  `)}
`

const StyledBtnLink = styled(StyledDropdownLink)`
  width: 100%;
`

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const navigate = useNavigate()

  const ref = useOutsideClick(() => setIsNavOpen(false), false)

  const { isLoggedIn, profile, login, logout } = useLiff()

  const { isAuthenticated } = useUser()

  const { authLogout, isPendingLogout } = useLogout()

  const handleLogin = () => {
    login?.()
  }

  const handleLogout = () => {
    if (isAuthenticated) {
      authLogout?.()
    }

    logout?.()

    sessionStorage.clear()

    setIsNavOpen(false)

    navigate("/", { replace: true })
  }

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "initial"
    }
  }, [isNavOpen])

  return (
    <StyledHeader>
      <StyledNavbar>
        <StyledData>
          <StyledToggle
            className={`${isNavOpen ? "show-icon" : ""}`}
            $isNavOpen={isNavOpen}
            onClick={(e) => {
              e.stopPropagation()

              setIsNavOpen((isNavOpen) => !isNavOpen)
            }}
          >
            <StyledOpen $isNavOpen={isNavOpen}>
              <HiBars3 />
            </StyledOpen>

            <StyledClose $isNavOpen={isNavOpen}>
              <HiOutlineXMark />
            </StyledClose>
          </StyledToggle>

          <StyledLogo to="/">Logo</StyledLogo>

          <StyledProfileDropdownContainer>
            {!isLoggedIn && <StyledProfileLoginBtn>登入</StyledProfileLoginBtn>}

            {isLoggedIn && profile && (
              <StyledProfileDropdown tabIndex={1}>
                <StyledProfileImg>
                  <img
                    src={profile.pictureUrl}
                    alt={`${profile.displayName} 的照片`}
                  />
                </StyledProfileImg>

                <span>{profile.displayName}</span>

                {/* <StyledIcons>
                <HiChevronDown className="profile-dropdown-arrow" />

                <HiOutlineXMark className="profile-dropdown-close" />
              </StyledIcons> */}
              </StyledProfileDropdown>
            )}

            <StyledProfileDropdownMenu>
              {isLoggedIn && !isAuthenticated && (
                <li>
                  <StyledProfileDropdownLink to="login">
                    <HiOutlineUser />
                    管理員登入
                  </StyledProfileDropdownLink>
                </li>
              )}

              {isAuthenticated && (
                <li>
                  <StyledProfileDropdownLink to="dashboard/account">
                    <HiOutlineLockClosed />
                    帳號設定
                  </StyledProfileDropdownLink>
                </li>
              )}

              {isLoggedIn && (
                <li>
                  <StyledProfileDropdownBtn>
                    <HiOutlineArrowRightOnRectangle />
                    登出
                  </StyledProfileDropdownBtn>
                </li>
              )}
            </StyledProfileDropdownMenu>
          </StyledProfileDropdownContainer>
        </StyledData>

        <StyledMenu $isNavOpen={isNavOpen}>
          <StyledList ref={ref}>
            {isLoggedIn && (
              <>
                <li>
                  <StyledLink to="appointment">線上預約</StyledLink>
                </li>

                <li>
                  <StyledLink to="appointments">我的預約</StyledLink>
                </li>
              </>
            )}

            {isLoggedIn && isAuthenticated && (
              <>
                <StyledDropdownItem>
                  <input
                    type="checkbox"
                    id="dropdown-toggle1"
                    className="dropdown-toggle1"
                    aria-label="toggle dropdown menu"
                  />

                  <StyledLabelLink htmlFor="dropdown-toggle1">
                    控制台
                    <HiChevronDown />
                  </StyledLabelLink>

                  <StyledDropdownMenu>
                    <li>
                      <StyledDropdownLink to="dashboard">
                        <HiOutlineSquaresPlus />
                        總覽
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink to="dashboard/appointments">
                        <HiOutlineBookmarkSquare />
                        全部預約
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink to="dashboard/services">
                        <HiOutlineRocketLaunch />
                        全部服務
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink to="dashboard/options">
                        <HiOutlineSparkles />
                        全部加選
                      </StyledDropdownLink>
                    </li>
                  </StyledDropdownMenu>
                </StyledDropdownItem>

                <StyledDropdownItem>
                  <input
                    type="checkbox"
                    id="dropdown-toggle2"
                    className="dropdown-toggle2"
                    aria-label="toggle dropdown menu"
                  />

                  <StyledLabelLink htmlFor="dropdown-toggle2">
                    管理
                    <HiChevronDown />
                  </StyledLabelLink>

                  <StyledDropdownMenu>
                    <li>
                      <StyledDropdownLink to="dashboard/users">
                        <HiOutlineUsers />
                        新增管理員
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink to="dashboard/settings">
                        <HiOutlineBuildingStorefront />
                        營業設定
                      </StyledDropdownLink>
                    </li>
                  </StyledDropdownMenu>
                </StyledDropdownItem>
              </>
            )}
          </StyledList>
        </StyledMenu>
      </StyledNavbar>
    </StyledHeader>
  )
}

export default Navbar
