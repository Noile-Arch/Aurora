import { Toaster } from "react-hot-toast";
import Logo from "../../components/ui/Logo";

export type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <main className="w-full md:w-[30%] md:mx-auto h-screen max-h-screen flex flex-col gap-[20px] p-4 relative">
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center w-full">
        <Logo image="/Logo.png" />
      </div>
      <h1 className="text-xl md:text-lg capitalize px-4 font-semibold text-md">{title}</h1>
      {children}
      <footer className="flex  w-full h-auto border border-[transparent] border-t-secondary mt-[20px] py-4 items-center justify-center flex-col gap-[10px]">
        <span className="text-xs text-zinc-600">
          Made with ❤ by Aurora devs.
        </span>
        <span className="capitalize text-xs text-center text-zinc-600">
          copyright 2024. all rights reserved
        </span>
      </footer>
    </main>
  );
};

export default Layout;
