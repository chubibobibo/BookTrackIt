function Chips({ title, idprop, handleActive, active }) {
  return (
    /** @active state determines the style to be applied to each button depending on the state in the parent component (DashboardPage) */
    <section
      className={`w-24 h-6  border-[0.5px] rounded-xl flex justify-center items-center text-[10px] uppercase font-semibold cursor-pointer md:text-xs md:w-26 md:hover:bg-indigo-50 md:hover:text-black md:active:bg-indigo-200 md:active:text-white ${
        active === idprop
          ? "bg-indigo-300 text-white transition-colors"
          : "bg-transparent"
      }`}
      /** onClick sets an id to a specific Chip component */
      onClick={() => {
        handleActive(idprop);
      }}
    >
      {title}
    </section>
  );
}
export default Chips;
