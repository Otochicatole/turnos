"use client";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import styles from "./styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        document.cookie = `token=${data.jwt}; path=/; SameSite=Strict`;
        router.push(`/admin`);
      } else {
        setError(data.error?.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor ' + err);
    }
  };


  const buildingVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ¡Bienvenido/a!
      </motion.h1>
      <motion.h3
        className={styles.subtitle}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Inicia sesión en tu cuenta
      </motion.h3>
      <form className={styles.form} onSubmit={handleLogin}>
        <motion.label
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className={styles.label}
          htmlFor=""
        >
          Correo Electrónico
        </motion.label>
        <input
          name="email"
          type="email"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          placeholder="Ingresa tu Correo Electrónico"
          className={styles.input}
        />
        <motion.label
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className={`${styles.label} ${styles.inputMarginTop}`}
          htmlFor=""
        >
          Contraseña
        </motion.label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Ingrese su Contraseña"
          className={styles.input}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <motion.div
          className={styles.buttonContainer}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button type="submit" className="py-4 w-full">Iniciar sesión</Button>
        </motion.div>
      </form>
      <div className={styles.backgroundShapes}>
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant1}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.1 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant2}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant3}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant4}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant5}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant6}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant7}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant8}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant9}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant10}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant11}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div
          className={`${styles.shape} ${styles.shapeVariant12}`}
          variants={buildingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
        />
      </div>
    </div>
  );
}
