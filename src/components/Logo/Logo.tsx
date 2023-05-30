import React from "react";
import { SVGProps } from "react";

export const MainLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    fill="none"
    viewBox="0 0 512 512"
    {...props}
  >
    <g fillRule="evenodd" clipPath="url(#main-site-logo)" clipRule="evenodd">
      <path
        fill="#3C4040"
        d="M166 264v15h30v-30h-30v15Zm150 0v15h30v-30h-30v15Zm-68.065 134.947c-10.358.879-16.951 4.053-23.463 11.295-11.327 12.598-10.54 33.146 1.718 44.853 2.37 2.264 10.096 7.202 17.169 10.973l12.859 6.856 12.403-6.626c15.543-8.305 19.42-11.604 23.587-20.072 2.915-5.924 3.286-7.608 3.243-14.708-.06-9.752-2.246-15.246-8.896-22.356-8.403-8.984-19.268-11.857-38.62-10.215Z"
      />
      <path
        fill="#DEDBD9"
        d="M118.362 5.212c-15.01 15.875-25.767 36.936-31.512 61.699-1.431 6.169-2.149 13.806-2.547 27.102-.561 18.752.171 28.516 3.333 44.44l1.579 7.953-3.858 2.957c-2.121 1.626-9.27 8.397-15.886 15.047-19.93 20.032-33.38 39.566-48.947 71.09-5.161 10.45-11.778 25.3-14.704 33l-5.32 14L.542 295c.164 48.542 30.305 94.68 83.958 128.52 12.787 8.065 38.744 20.553 54.124 26.04l13.125 4.683.501 6.628c1.648 21.798 17.889 43.027 37.605 49.154 4.383 1.362 9.206 1.975 15.54 1.975 21.556 0 37.948-8.967 46.07-25.203 1.944-3.886 3.535-7.68 3.535-8.431 0-.751.45-1.366 1-1.366s1 .615 1 1.366c0 .751 1.572 4.508 3.494 8.348 8.603 17.198 25.623 26.002 48.438 25.057 12.516-.519 18.658-2.578 27.468-9.21 13.598-10.235 23.6-28.794 23.6-43.789v-4.439l13.25-4.727c15.492-5.528 41.427-17.998 54.25-26.086 39.282-24.776 65.891-55.849 77.514-90.52 2.75-8.203 5.936-22.492 5.964-26.75.012-1.788.472-3.25 1.022-3.25.601 0 1-4.056 1-10.167 0-5.591-.3-9.867-.666-9.501-.366.366-2.766-5.071-5.334-12.083-11.605-31.695-27.104-60.866-45.18-85.037-7.06-9.44-27.407-30.824-35.159-36.95l-3.839-3.033 1.561-7.865c3.142-15.834 3.874-25.629 3.314-44.351-.768-25.668-4.523-41.112-14.917-61.345-8.288-16.137-22.769-33.977-25.992-32.024-.776.471-15.334 13.255-32.35 28.41L323.5 56.607l-8.808 2.202c-13.417 3.354-26.636 8.59-43.482 17.224l-15.291 7.836-15.209-7.841c-16.709-8.613-29.917-13.852-43.402-17.213L188.5 56.62l-31.255-27.843C140.055 13.463 125.399.707 124.676.429c-.726-.279-3.552 1.862-6.314 4.783ZM166 264v15h30v-30h-30v15Zm150 0v15h30v-30h-30v15ZM.37 294c0 5.775.165 8.137.367 5.25.202-2.887.202-7.613 0-10.5-.202-2.887-.367-.525-.367 5.25Zm247.565 104.947c-10.358.879-16.951 4.053-23.463 11.295-11.327 12.598-10.54 33.146 1.718 44.853 2.37 2.264 10.096 7.202 17.169 10.973l12.859 6.856 12.403-6.626c15.543-8.305 19.42-11.604 23.587-20.072 2.915-5.924 3.286-7.608 3.243-14.708-.06-9.752-2.246-15.246-8.896-22.356-8.403-8.984-19.268-11.857-38.62-10.215Z"
      />
    </g>
    <defs>
      <clipPath id="main-site-logo">
        <path fill="#fff" d="M0 0h512v512H0z" />
      </clipPath>
    </defs>
  </svg>
);