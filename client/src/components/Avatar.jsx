import { avatarSize } from "../utils/materialComponentSizes/avatarSize";

function Avatar({ handleOpen, size }) {
  return (
    <section onClick={handleOpen}>
      <h1
        /** map the object avatarSize using the the props (size) as the key */
        className={`${avatarSize[size]} bg-indigo-500 rounded-full flex justify-center items-center text-gray-300`}
      >
        U
      </h1>
    </section>
  );
}
export default Avatar;
