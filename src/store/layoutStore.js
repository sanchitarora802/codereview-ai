import { create } from "zustand";

const useLayoutStore = create((set) => ({
  showModal: "",

  changeModal: (payload, data = null) => {
    set({ showModal: payload, modalData: data });
  },
}));

export default useLayoutStore;
