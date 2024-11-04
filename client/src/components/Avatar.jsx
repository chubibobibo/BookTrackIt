import {
  avatarSize,
  avatarTextSize,
} from "../utils/materialComponentSizes/avatarSize";

import { toCapitalize } from "../hooks/toCapitalize";

function Avatar({ handleOpen, size, textSize, userData }) {
  return (
    <section onClick={handleOpen} className='cursor-pointer '>
      <h1
        /** map the object avatarSize using the the props (size) as the key */
        className={`${avatarSize[size]} bg-indigo-500 rounded-full flex justify-center items-center text-gray-300 ${avatarTextSize[textSize]}`}
      >
        {toCapitalize(userData?.username.slice(0, 1))}
      </h1>
    </section>
  );
}
export default Avatar;
