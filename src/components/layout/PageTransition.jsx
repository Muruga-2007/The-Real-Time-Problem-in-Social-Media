import { motion } from 'framer-motion'
import { pageVariants } from '../../hooks/useAnimationVariants.js'

export function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}
