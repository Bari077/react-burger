import { CSSProperties, forwardRef } from 'react';
import { NavLink as BaseNavLink, NavLinkProps } from "react-router-dom";

type NavLinkWrapperProps = NavLinkProps & {
  activeClassName?: string
  activeStyle?: CSSProperties
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkWrapperProps>(
  ({ activeClassName, activeStyle, ...props }: NavLinkWrapperProps, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  }
);