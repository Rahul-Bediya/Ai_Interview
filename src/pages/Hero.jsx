import { motion } from "framer-motion";
// import { Brain, ArrowRight, Zap, Target, Award, Link } from "lucide-react";
import { Brain, ArrowRight, Zap, Target, Award } from "lucide-react";
import { Scene3D } from "../ui/Scene3D";
import { Link } from "react-router-dom";

export function HeroSection() {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Complete your interview in minutes, not hours",
        },
        {
            icon: Target,
            title: "Precise Scoring",
            description: "AI-powered evaluation for accurate assessment",
        },
        {
            icon: Award,
            title: "Instant Results",
            description: "Get feedback immediately after completion",
        },
    ];

    return (
        <section className="relative min-h-screen flex flex-col md:flex-row items-start md:items-center justify-center 
                    overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black py-12 md:py-0">
            <Scene3D />

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-indigo-300/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 z-10 text-center max-w-4xl flex flex-col justify-center">
                {/* Logo */}
                <div className="flex items-center justify-center mb-6">
                    <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg"
                        animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                        transition={{
                            rotateY: { duration: 4, repeat: Infinity },
                            scale: { duration: 2, repeat: Infinity },
                        }}
                    >
                        <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                </div>

                {/* Title + description */}
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-300 to-emerald-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Crisp Interview
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Experience the future of technical interviews with AI-powered
                    assessments that adapt to your skills and provide instant feedback.
                </motion.p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            <f.icon className="w-8 h-8 text-indigo-300 mb-3 mx-auto" />
                            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-300">{f.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
               <Link to="/upload">
                <motion.button                    
                    className="mt-6 md:mt-8 px-8 py-4 text-lg font-semibold text-white 
                 bg-gradient-to-r from-indigo-400 to-emerald-400 
                 rounded-xl shadow-lg hover:shadow-xl transition-all 
                 flex items-center gap-2 mx-auto"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                    Start Your Interview
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
                </Link>
               
            </div>

            {/* Background blobs */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
        </section>
    );
}
