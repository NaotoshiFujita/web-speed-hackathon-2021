import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} icon
 * @property {string} text
 * @property {string} [href]
 * @property {() => void} [onClick]
 */

/** @type {React.VFC<Props>} */
const NavigationItem = ({ href, icon, onClick, text }) => {
  const wrapperClasses = 'flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full';
  const iconClasses = 'text-xl lg:pr-2 lg:text-3xl';
  const textClasses = 'hidden sm:inline sm:text-sm lg:text-xl lg:font-bold';

  return (
    <li className="contain-content">
      {href !== undefined ? (
        <NavLink
          end
          className={({ isActive }) =>
            classNames(
              wrapperClasses,
              {
                'text-green-800': isActive,
              },
            )
          }
          onClick={onClick}
          to={href}
        >
          <span className={ iconClasses }>{icon}</span>
          <span className={ textClasses }>{text}</span>
        </NavLink>
      ) : (
        <button
          className={ wrapperClasses }
          onClick={onClick}
        >
          <span className={ iconClasses }>{icon}</span>
          <span className={ textClasses }>{text}</span>
        </button>
      )}
    </li>
  );
};

export { NavigationItem };
