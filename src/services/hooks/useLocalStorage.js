import { useState } from "react";

export default function useLocalStorage() {
  const [storage, setStorage] = useState({ user: () => getUser() });

  function setUser(value) {
    localStorage.setItem("user", value);
  }

  function getUser() {
    return localStorage.getItem("user");
  }

  return [storage, setUser, setStorage];
}
