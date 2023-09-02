import {useState} from 'react';

export interface IModalMethods {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
}
export const useModalMethods = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const toggle = () => setIsOpen(p => !p);
  return {isOpen, close, open, toggle};
};
