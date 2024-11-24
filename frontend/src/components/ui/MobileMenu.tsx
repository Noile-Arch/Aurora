import {motion} from 'framer-motion'
import { menuVariants } from '../../utils/framer-variants/menuVariants';


const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="absolute inset-0 h-screen bg-[rgba(0,0,0,0.8)] flex items-end justify-end text-[#EDEADE]"
    >
      <div className="h-full w-[80%] bg-primary p-4">
        { children }
      </div>
    </motion.div>
  );
};

export default MobileMenu;
