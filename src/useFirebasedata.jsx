import { useState, useEffect } from 'react';
import { database } from "./firebaseConfig.js";
import { ref, onValue, off, get } from "firebase/database";

// Custom hook para manejar la lectura de datos de Firebase
const useFirebaseData = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Referencia a la base de datos
    const dbRef = ref(database, path);
    
    // Función para manejar los cambios en los datos
    const handleData = (snapshot) => {
      try {
        const fetchedData = snapshot.val();
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    // Función para manejar errores
    const handleError = (err) => {
      setError(err);
      setLoading(false);
    };

    // Suscribirse a los cambios
    onValue(dbRef, handleData, handleError);

    // Limpieza al desmontar el componente
    return () => {
      off(dbRef);
    };
  }, [path]);

  return { data, loading, error };
};

export default useFirebaseData;