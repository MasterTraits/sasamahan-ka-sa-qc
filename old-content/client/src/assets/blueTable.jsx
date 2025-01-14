import React from "react";

export default function blueTable({output}) {
  return (
    <div className={`${output}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 7H19V14C19 14.9428 19 15.4142 18.7071 15.7071C18.4142 16 17.9428 16 17 16H14V7Z"
          stroke="#3F56FF"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M4 7H9V16H6C5.05719 16 4.58579 16 4.29289 15.7071C4 15.4142 4 14.9428 4 14V7Z"
          stroke="#3F56FF"
          stroke-width="2"
          stroke-linecap="round"
        />
        <rect
          x="9"
          y="7"
          width="5"
          height="9"
          stroke="#3F56FF"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M4 5C4 4.05719 4 3.58579 4.29289 3.29289C4.58579 3 5.05719 3 6 3H17C17.9428 3 18.4142 3 18.7071 3.29289C19 3.58579 19 4.05719 19 5V7H4V5Z"
          stroke="#3F56FF"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
}
