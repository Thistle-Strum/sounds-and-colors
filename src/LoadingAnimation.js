
import { motion } from 'framer-motion'

function LoadingAnimation() {

    const loadingContainerVariants = {
        start: {
            transition: {
                staggerChildren: 0.1
            },
        },
        end: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const loadingCircleVariants = {
        start: {
            y:'0%'
        },
        end: {
            y:'100%'
        }
    };

    const loadingCircleTransition = {
        duration: 0.4,
        yoyo: Infinity,
        ease: 'easeInOut'
    }

    return (
            <motion.div 
                className="loadingContainer" 
                variants={loadingContainerVariants}
                initial='start'
                animate='end'
                >
                    <motion.span 
                        className="loadingCircle1" 
                        variants={loadingCircleVariants} 
                        transition={loadingCircleTransition}/
                        >
                        <motion.span 
                        className="loadingCircle2" 
                        variants={loadingCircleVariants} 
                        transition={loadingCircleTransition}/
                        >
                        <motion.span 
                        className="loadingCircle3" 
                        variants={loadingCircleVariants} 
                        transition={loadingCircleTransition}/
                        >
                        <motion.span 
                        className="loadingCircle4" 
                        variants={loadingCircleVariants} 
                        transition={loadingCircleTransition}/
                        >
                        <motion.span 
                        className="loadingCircle5" 
                        variants={loadingCircleVariants} 
                        transition={loadingCircleTransition}/
                        >
               
            </motion.div>
    )
}

export default LoadingAnimation;