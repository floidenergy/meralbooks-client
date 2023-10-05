import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
export default function Default() {
  const navigator = useNavigate();
  
  useEffect(() => {
    navigator('/store')
  }, [navigator]);

  return (
    <div>Loading...</div>
  )
}
